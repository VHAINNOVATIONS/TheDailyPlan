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
            diet.status = order.status;
            if (timeUtility.nowIsBefore(diet.stop)) {
                if (result.currentDietProfile.length) {
                    if (timeUtility.existingIsBefore(diet.start, result.currentDietProfile[0].start)) {
                        result.currentDietProfile[0] = diet;
                    }
                } else {
                  result.currentDietProfile.push(diet);
                }
            }
        }
    },
    lab: function (result, order) {
        if (order.status === 'Pending') {
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
            if (timeUtility.nowIsBefore(lab.stop)) {
                result.labOrders.push(lab);
            }
        }
    },
    imaging: function (result, order) {
        if (order.status === 'Pending') {
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
            if (timeUtility.nowIsBefore(radiology.stop)) {
                result.radiologyOrders.push(radiology);
            }
        }
    },
    procedures: function(result, order, options) {
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
        if (procedure.start && timeUtility.startWithinFutureDays(procedure.startDate, options.numDaysFuture)) {
            result.procedures.push(procedure);
        }
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
    if (! testNames || ! testNames.length) {
        return report;
    }
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

var reduceLabToTests = function(fullLabResults, occurances, backDays) {
    var testNameOccurances = {};
    return fullLabResults.reduce(function(r, fullLabResult) {
        var collectionDate =fullLabResult.specimen.collectionDate;
        var key = collectionDate;
            if(key && timeUtility.dateAfterBackDays(key, backDays)) {

            fullLabResult.labResults.forEach(function(labResult) {
                var e = {
                    date: collectionDate,
                    value: labResult.value,
                    key: key
                }
                var name = labResult.labTest.name;
                if (! testNameOccurances[name]) {
                    testNameOccurances[name] = 1;
                } else {
                    ++testNameOccurances[name];
                }
                if (testNameOccurances[name] <= occurances) {
                    if (labResult.labTest) {
                          e.name = name;
                          e.units = labResult.labTest.units;
                          e.refRange = labResult.labTest.refRange;
                    }
                    r.push(e);
                }
            });
        }
        return r;
    }, []);
};

var sortLabByTestNames = function(labResults)
{
    return _.sortByAll(labResults, ['name']);
}

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
                var result = translator.translateVitalSigns(body, options.occurances,options.backdays);
                callback(null, result);
            }
        });
    },
    getPostings: function (userSession, patientId, options, callback) {
        this.get(userSession, '/getPostings', {
            patientId: patientId,
            nRpts: "0"
        }, function (err, rawResult) {
            if (err) {
                callback(err);
            } else {
                var includeTypes = _.get(options, 'includeTypes', null);
                var result = rawResult;
                if (includeTypes && includeTypes.length) {
                    if (! Array.isArray(includeTypes)) {
                        includeTypes = [includeTypes];
                    }
                    var dictionary = _.indexBy(includeTypes, _.toUpper);
                    result = _.filter(rawResult, function(p) {
                        return p.type && dictionary[p.type.toUpperCase()];
                    });
                }
                var d = {};
                result = result.reduce(function(r, p) {
                    if (! d[p.type]) {
                        d[p.type] = true;
                        r.push(p);
                    }
                    return r;
                }, []);
                result.forEach(function(item) {
                    item.text = item.text.join(' ').trim();
                    item.text = item.text.replace('  ', ' ');
                    item.entryDate = timeUtility.postingsDate(item.entryDate);
                });
                callback(null, result);
            }
        });
    },
    getPostingTypes: function(userSession, callback) {
        this.get(userSession, '/getPostingTypes', null, function (err, result) {
            if (err) {
                callback(err);
            } else {
                result.sort();
                callback(null, result);
            }
        });
    },
    getTestNames: function(userSession, callback) {
        this.get(userSession, '/getTestNames', null, function (err, result) {
            if (err) {
                callback(err);
            } else {
                var dict = {};
                var rresult = result.reduce(function(r, name) {
                    name = name.trim();
                    if (name && ! dict[name]) {
                        dict[name] = true;
                        r.push(name);
                    }
                    return r;
                }, []);
                callback(null, rresult);
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
                                updater(r, order, options);
                            }
                        }
                    }
                    return r;
                }, {});
                callback(null, classifiedOrders);
            }
        });
    },
    getConsults: function (userSession, patientId, options, callback) {
        var self = this;
        this.get(userSession, '/getConsults', {
            patientId: patientId
        }, function (err, consults) {
            if (err) {
                callback(err);
            } else {
                consults = consults || [];
                var result = consults.map(function(c) {
                    return {
                        service: (c.service || '').split(' CONSULT')[0],
                        requestDate: c.requestDate && translator.translateVistADateTime(c.requestDate),
                        earliestDate: c.earliestDate && translator.translateVistADate(c.earliestDate)
                    };
                });
                callback(null, result);
            }
        });
    },
    logout: function (userSession, callback) {
        callback(null);
    },
    getChemHemReports: function (userSession, patientId, options, callback) {
        this.get(userSession, '/getChemHemLabs', {
            patientId: patientId,
            toDate: translator.vistAFuture(),
            fromDate: 0
        }, function (err, result) {
            if (err) {
                callback(err);
            } else {
                result = filterChemHemReports(result, options.testNames);
                putInChemHemReportDates(result);
                var backDays = options.backDays;
                if (backDays === undefined || backDays === null) {
                    backDays = 30;
                }
                result = reduceLabToTests(result, options.occurances, backDays);
                result = sortLabByTestNames(result);
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
        this.get(userSession, '/getPatientHealthFactors', {
            patientId: patientId
        }, function (err, result) {
            if (err) {
                callback(err);
            } else {
                var includeFactors = _.get(options, 'includeFactors', null);
                if (includeFactors && includeFactors.length) {
                    if (! Array.isArray(includeFactors)) {
                        includeFactors = [includeFactors];
                    }
                    var dictionary = _.indexBy(includeFactors, _.toUpper);
                    result = _.filter(result, function(hf) {
                        return hf.name && dictionary[hf.name.toUpperCase()];
                    });
                }
                var d = {};
                result = result.reduce(function(r, hf) {
                    if (! d[hf.name]) {
                        d[hf.name] = true;
                        r.push(hf);
                    }
                    return r;
                }, []);
                result.forEach(function(r) {
                  if (r.date) {
                    r.date = translator.translateVistADate(r.date);
                  }
                });
                callback(null, result);
            }
        });
    },
    getSystemHealthFactors: function(userSession, callback) {
        this.get(userSession, '/getSystemHealthFactors', null, function (err, result) {
            if (err) {
                callback(err);
            } else {
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
