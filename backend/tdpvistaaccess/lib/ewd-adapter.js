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
    }
};

var session = {
    get: function (route, parameters, callback) {
        var options = _.assign({
            uri: this.baseUrl + route
        }, {
            method: 'GET',
            json: true,
            strictSSL: false
        });
        if (this.Authorization) {
            options.headers = {
                'Authorization': this.Authorization
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
        this.get('/initiate', null, function (err, body) {
            if (err) {
                callback(err);
            } else {
                self.Authorization = body.Authorization;
                var credentials = encryptCredentials(userInfo.accessCode, userInfo.verifyCode, body.key);
                self.get('/login', {
                    credentials: credentials
                }, function (err, body) {
                    if (err) {
                        callback(err);
                    } else {
                        self.userData = body;
                        callback(null, body);
                    }
                });
            }
        });
    },
    searchPatients: function (searchParams, callback) {
        this.get('/patientsByName', {
            prefix: searchParams['prefix']
        }, function (err, body) {
            if (err) {
                callback(err);
            } else {
                callback(null, body);
            }
        });
    },
    getDemographics: function (patientId, options, callback) {
        this.get('/patientSummary', {
            id: patientId
        }, function (err, body) {
            if (err) {
                callback(err);
            } else {
                callback(null, body);
            }
        });
    },
    getAllergies: function (patientId, options, callback) {
        this.get('/getAllergiesDetailMap', {
            patientId: patientId
        }, function (err, body) {
            if (err) {
                callback(err);
            } else {
                callback(null, body);
            }
        });
    },
    getVitalSigns: function (patientId, options, callback) {
        this.get('/getRawVitalSignsMap', {
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
    getClinicalWarnings: function (patientId, options, callback) {
        this.get('/getClinicalWarnings', {
            patientId: patientId,
            nRpts: "0"
        }, function (err, body) {
            if (err) {
                callback(err);
            } else {
                var result = body; //translator.translateVitalSigns(body);
                callback(null, result);
            }
        });
    },
    getImmunizations: function (patientId, options, callback) {
        this.get('/getImmunizations', {
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
    getVisits: function (patientId, options, callback) {
        var numDaysFuture = _.get(options, "numDaysFuture", 0);
        var numDaysPast = _.get(options, "numDaysPast", 0);
        var fromDate = translator.translateNumDaysPast(numDaysPast);
        var toDate = translator.translateNumDaysFuture(numDaysFuture);
        this.get('/getVisits', {
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
    getMedications: function (patientId, options, callback) {
        this.get('/getMedicationsDetailMap', {
            patientId: patientId
        }, function (err, body) {
            if (err) {
                callback(err);
            } else {
                callback(null, body);
            }
        });
    },
    getProblems: function (patientId, options, callback) {
        this.get('/getProblemsListDetailMap', {
            patientId: patientId,
            type: 'ALL'
        }, function (err, body) {
            if (err) {
                callback(err);
            } else {
                var result = translator.translateProblemList(body);
                callback(null, result);
            }
        });
    },
    getRadiologyReports: function (patientId, options, callback) {
        this.get('/getRadiologyReportsDetailMap', {
            patientId: patientId,
            type: 'ALL'
        }, function (err, body) {
            if (err) {
                callback(err);
            } else {
                var result = translator.translateRadiologyReports(body);
                callback(null, result);
            }
        });
    },
    _getAllOrders: function (patientId, options, callback) {
        var self = this;
        this.get('/getAllOrders', {
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
    getAllOrders: function (patientId, options, callback) {
        if (this.orderTypes) {
            this._getAllOrders(patientId, options, callback);
        } else {
            var self = this;
            this.get('/getOrderTypes', {}, function (err, types) {
                if (err) {
                    callback(err);
                } else {
                    self.orderTypes = types;
                    self._getAllOrders(patientId, options, callback);
                }
            });
        }
    },
    getOrdersAsClassified: function (patientId, options, callback) {
        this.getAllOrders(patientId, options, function (err, orders) {
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
    logout: function (callback) {
        callback(null);
    }
};

exports.newSession = function (options, callback) {
    var c = Object.create(session);
    c.baseUrl = options.baseUrl;
    callback(null, c);
};
