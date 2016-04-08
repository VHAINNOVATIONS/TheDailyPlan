"use strict";

var util = require('util');
var _ = require('lodash');
var request = require('request');
var crypto = require('crypto');

var translator = require('./translator');
var timeUtility = require('./time-utility');

request = request.defaults({
    jar: true
});

var encryptCredentials = function (accessCode, verifyCode, key) {
    //Enhanced by SAN Businesss Consultants 20150929 for symetry with PHP
    var cleankey = '';
    for (var i = 0; i < key.length; i++) {
        if (key[i] !== '-') {
            cleankey += key[i];
        }
    }
    var text = 'accessCode:' + accessCode + ';verifyCode:' + verifyCode;
    var iv1 = '1234567890123456';
    var algorithm1 = 'aes-256-cbc';

    var cipher1 = crypto.createCipheriv(algorithm1, cleankey, iv1);
    var crypted = cipher1.update(text, 'utf8', 'hex');
    crypted += cipher1.final('hex');
    var encrypted1 = iv1 + '_x_' + crypted;
    return encrypted1;
};

var typedOrderUpdater = {
    diet: function (result, order) {
        if (order.status === 'Active') {
            if (!result.currentDietProfile) {
                result.currentDietProfile = [];
            }
            var diet = {
                description: order.text
            };
            if (order.startDate) {
                diet.start = order.startDate;
            }
            if (order.stopDate) {
                diet.stop = order.stopDate;
            }
            if (timeUtility.nowIsBetween(diet.start, diet.stop)) {
                result.currentDietProfile.push(diet);
            }
        }
    },
    lab: function (result, order) {
        if (order.status === 'Active' || order.status === 'Pending') {
            if (!result.labOrders) {
                result.labOrders = [];
            }
            var lab = {
                testName: order.text
            };
            if (order.startDate) {
                lab.start = order.startDate;
            }
            if (order.stopDate) {
                lab.stop = order.stopDate;
            }
            lab.status = order.status;
            if (timeUtility.nowIsBetween(lab.start, lab.stop)) {
                result.labOrders.push(lab);
            }
        }
    },
    imaging: function (result, order) {
        if (order.status === 'Active' || order.status === 'Pending') {
            if (!result.radiologyOrders) {
                result.radiologyOrders = [];
            }
            var radiology = {
                testName: order.text
            };
            if (order.startDate) {
                radiology.start = order.startDate;
            }
            if (order.stopDate) {
                radiology.stop = order.stopDate;
            }
            radiology.status = order.status;
            if (timeUtility.nowIsBetween(undefined, radiology.stop)) {
                result.radiologyOrders.push(radiology);
            }
        }
    },
    procedures: function(result, order) {
      if (order.status === 'Pending') {
        if (! result.procedures) {
          result.procedures = [];
        }
        var procedure = {
            name: order.text
        };
        if (order.startDate) {
            procedure.start = order.startDate;
        }
        result.procedures.push(procedure);
      }
    }
};

var toPatientList = function (rawData, ignoreSecondPiece) {
    var result = [];
    if (rawData && rawData.value) {
        result = Object.keys(rawData.value).reduce(function (r, index) {
            var line = rawData.value[index];
            var pieces = line.split('^');
            var patient = {
                id: pieces[0],
                name: pieces[1]
            };
            if (!ignoreSecondPiece && pieces[2]) {
                var locationPieces = pieces[2].split('-');
                patient.location = {
                    room: locationPieces[0],
                    bed: locationPieces[1]
                };
            }
            r.push(patient);
            return r;
        }, []);
    }
    return result;
};

var filterChemHemReports = function (report, testNames) {
    var testNameDict = testNames.reduce(function (r, testName) {
        r[testName] = true;
        return r;
    }, {});
    var result = report.reduce(function (r, reportElement) {
        if (reportElement.labResults && reportElement.labResults.length) {
            var filtered = reportElement.labResults.filter(function (labResult) {
                var testName = labResult.labTest && labResult.labTest.name;
                return testName && testNameDict[testName];
            });
            if (filtered.length) {
                reportElement.labResults = filtered;
                r.push(reportElement);
            }
        }
        return r;
    }, []);
    return result;
};

var putInChemHemReportDates = function(report) {
    report.forEach(function (reportElement) {
      var timestamp = reportElement.timestamp
      if (timestamp) {
        reportElement.timestamp = translator.translateVistADateTime(timestamp);
      }
      var specimen = reportElement.specimen;
      if (specimen) {
        if (specimen.reportDate) {
          specimen.reportDate = translator.translateVistADateTime(specimen.reportDate);
        }
        if (specimen.collectionDate) {
          specimen.collectionDate = translator.translateVistADateTime(specimen.collectionDate);
        }
      }
    });
};

var session = {
    get: function (userSession, route, parameters, callback) {
        var options = _.assign({
            uri: this.baseUrl + userSession._port + this.serverRoute + route
        }, {
            method: 'GET',
            json: true,
            strictSSL: false
        });
        if (userSession._id) {
            options.headers = {
                'Authorization': userSession._id
            };
        }
        if (parameters) {
            options.qs = parameters;
        }
        request.get(options, function (err, response, body) {
            if ((!err) && response.statusCode !== 200) {
                var message = body && body.message;
                if (!message) {
                    message = util.format('Invalid response status for %s: %s', options.uri, response.statusCode);
                }
                err = new Error(message);
            }
            if (err) {
                callback(err, body);
            } else {
                callback(null, body);
            }
        });
    },
    login: function (userInfo, callback) {
        var self = this;
        var alias = userInfo.location || 'default';
        var port = this.ports[alias];
        var userSession = {
          _port: port
        };
        this.get(userSession, '/initiate', null, function (err, body) {
            if (err) {
                callback(err);
            } else {
                var authorization = body.Authorization;
                var credentials = encryptCredentials(userInfo.accessCode, userInfo.verifyCode, body.key);
                userInfo.userKeys = userInfo.userKeys || [];
                var keysStr = userInfo.userKeys.map(function(userKey) {
                  return userKey.vista;
                }).join('^');
                userSession._id = authorization;
                self.get(userSession, '/login', {
                    credentials: credentials,
                    keys: keysStr
                }, function (err, userData) {
                    if (err) {
                        callback(err);
                    } else {
                        var keys = userData.keys || [];
                        var keysObj = userInfo.userKeys.reduce(function(r, userKey, index) {
                          r[userKey.client] = keys[userKey.vista];
                          return r;
                        }, {});
                        userData.keys = keysObj;
                        userData.authKey = authorization;
                        userData.authPort = port;
                        callback(null, userData);
                    }
                });
            }
        });
    },
    searchPatients: function (userSession, searchParams, callback) {
        this.get(userSession, '/patientsByName', {
            prefix: searchParams.prefix
        }, function (err, body) {
            if (err) {
                callback(err);
            } else {
                callback(null, body);
            }
        });
    },
    getDemographics: function (userSession, patientId, options, callback) {
        this.get(userSession, '/getPatientMap', {
            patientId: patientId
        }, function (err, body) {
            if (err) {
                callback(err);
            } else {
                body.dob = translator.translateVistADate(body.dob);
                body.sex = body.gender;
                body.DOB = body.dob;
                body.SSN = body.ssn; // until client changes not to break
                callback(null, body);
            }
        });
    },
    getAllergies: function (userSession, patientId, options, callback) {
        this.get(userSession, '/getAllergies', {
            patientId: patientId
        }, function (err, result) {
            if (err) {
                return callback(err);
            }
            if (result.status) {
              result.allergies.sort(function(a, b) {
                if (a.allergenType === b.allergenType) {
                  return 0;
                }
                if (a.allergenType && (a.allergenType.indexOf('D') >= 0)) {
                  return -1;
                }
                return 1;
              });
              result.allergies.forEach(function(allergy) {
                if (allergy.reaction) {
                  allergy.reaction = allergy.reaction.join('; ');
                }

              });
            }
            callback(null, result);
        });
    },
    getVitalSigns: function (userSession, patientId, options, callback) {
        this.get(userSession, '/getRawVitalSignsMap', {
            patientId: patientId
        }, function (err, body) {
            if (err) {
                callback(err);
            } else {
                var result = translator.translateVitalSigns(body);
                callback(null, result);
            }
        });
    },
    getPostings: function (userSession, patientId, options, callback) {
        this.get(userSession, '/getPostings', {
            patientId: patientId,
            nRpts: "0"
        }, function (err, result) {
            if (err) {
                callback(err);
            } else {
                result.forEach(function(item) {
                    item.text = item.text.join(' ').trim();
                    item.text = item.text.replace('  ', ' ');
                });
                callback(null, result);
            }
        });
    },
    getImmunizations: function (userSession, patientId, options, callback) {
        this.get(userSession, '/getImmunizations', {
            patientId: patientId,
            nRpts: "0"
        }, function (err, body) {
            if (err) {
                callback(err);
            } else {
                var result = translator.translateImmunizations(body);
                callback(null, result);
            }
        });
    },
    getVisits: function (userSession, patientId, options, callback) {
        var numDaysFuture = _.get(options, "numDaysFuture", 0);
        var numDaysPast = _.get(options, "numDaysPast", 0);
        var fromDate = translator.translateNumDaysPast(numDaysPast);
        var toDate = translator.translateNumDaysFuture(numDaysFuture);
        this.get(userSession, '/getVisits', {
            patientId: patientId,
            fromDate: fromDate,
            toDate: toDate
        }, function (err, body) {
            if (err) {
                callback(err);
            } else {
                var result = translator.translateVisits(body);
                callback(null, result);
            }
        });
    },
    getMedications: function (userSession, patientId, options, callback) {
        this.get(userSession, '/getMedications', {
            patientId: patientId
        }, function (err, body) {
            if (err) {
                callback(err);
            } else {
                var meds = translator.translateMeds(body, options.type);
                callback(null, meds);
            }
        });
    },
    _getAllOrders: function (userSession, patientId, options, callback) {
        var self = this;
        this.get(userSession, '/getAllOrders', {
            patientId: patientId,
            vistANow: translator.vistANow()
        }, function (err, body) {
            if (err) {
                callback(err);
            } else {
                var result = translator.translateOrdersList(body, self.orderTypes);
                callback(null, result);
            }
        });
    },
    getAllOrders: function (userSession, patientId, options, callback) {
        if (this.orderTypes) {
            this._getAllOrders(userSession, patientId, options, callback);
        } else {
            var self = this;
            this.get(userSession, '/getOrderTypes', {}, function (err, types) {
                if (err) {
                    callback(err);
                } else {
                    self.orderTypes = types;
                    self._getAllOrders(userSession, patientId, options, callback);
                }
            });
        }
    },
    getOrders: function (userSession, patientId, options, callback) {
        this.getAllOrders(userSession, patientId, options, function (err, orders) {
            if (err) {
                callback(err);
            } else {
                var classifiedOrders = orders.reduce(function (r, order) {
                    if (order) {
                        var type = order.type;
                        if (type && type.topName) {
                            var updater = typedOrderUpdater[type.topName.toLowerCase()];
                            if (updater) {
                                updater(r, order);
                            }
                        }
                    }
                    return r;
                }, {});
                callback(null, classifiedOrders);
            }
        });
    },
    logout: function (userSession, callback) {
        callback(null);
    },
    getChemHemReports: function (userSession, patientId, options, callback) {
        this.get(userSession, '/getChemHemLabs', {
            patientId: patientId,
            toDate: options.toDate,
            fromDate: options.fromDate
        }, function (err, result) {
            if (err) {
                callback(err);
            } else {
                result = filterChemHemReports(result, options.testNames);
                putInChemHemReportDates(result);
                callback(null, result);
            }
        });
    },
    getClinics: function (userSession, options, callback) {
        this.get(userSession, '/getClinics', null, function (err, result) {
            if (err) {
                callback(err);
            } else {
                callback(null, result);
            }
        });

    },
    getPatientsByClinic: function (userSession, options, callback) {
        this.get(userSession, '/getPatientsByClinic', options, function (err, result) {
            if (err) {
                callback(err);
            } else {
                result = toPatientList(result, true);
                callback(null, result);
            }
        });
    },
    getPatientsByWard: function (userSession, options, callback) {
        this.get(userSession, '/getPatientsByWard', options, function (err, result) {
            if (err) {
                callback(err);
            } else {
                result = toPatientList(result);
                callback(null, result);
            }
        });
    },
    getWards: function (userSession, options, callback) {
        this.get(userSession, '/getWards', null, function (err, result) {
            if (err) {
                callback(err);
            } else {
                callback(null, result);
            }
        });
    },
    getHealthFactors: function(userSession, patientId, options, callback) {
        var numDaysBack = _.get(options, "numDaysBack", 90);
        var fromDate = translator.translateNumDaysPast(numDaysBack);
        this.get(userSession, '/getPatientHealthFactors', {
            patientId: patientId,
            fromDate: fromDate
        }, function (err, result) {
            if (err) {
                callback(err);
            } else {
              result.forEach(function(r) {
                if (r.date) {
                  r.date = translator.translateVistADate(r.date);
                }
              });
              callback(null, result);
            }
        });
    },
    getBoilerplates: function(userSession, patientId, options, callback) {
      this.get(userSession, '/resolveBPs', {
        patientId: patientId,
        text: options.text
      }, function(err, result) {
        if (err) {
          return callback(err);
        }
        callback(null, result);
      });
    }
};

exports.newSession = function (options, callback) {
    var c = Object.create(session);
    c.baseUrl = options.baseUrl;
    c.ports = options.ports;
    c.serverRoute = options.serverRoute;
    c.userKeys = options.userKeys;
    callback(null, c);
};
