"use strict";

var util = require('util');
var _ = require('lodash');
var request = require('request');
var crypto = require('crypto');

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
                if (! message) {
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
                callback(null, body);
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
