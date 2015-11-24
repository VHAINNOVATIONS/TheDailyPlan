"use strict";

var util = require('util');
var _ = require('lodash');
var request = require('request');
var crypto = require('crypto');

request = request.defaults({
    jar: true
});

var session = {
    baseUrl: 'http://localhost:8082/tdp/vista'
};

session.get = function (route, parameters, callback) {
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
            var message = util.format('Invalid response status for %s: %s', options.uri, response.statusCode);
            err = new Error(message);
        }
        if (err) {
            callback(err, body);
        } else {
            callback(null, body);
        }
    });
};

var encryptCredentials = function (accessCode, verifyCode, key) {
    var text = 'accessCode=' + accessCode + '&verifyCode=' + verifyCode;
    var cipher = crypto.createCipher('aes-256-cbc', key);
    var crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
};

session.login = function (userInfo, callback) {
    var credentials = encryptCredentials(userInfo.accessCode, userInfo.verifyCode, this.key);
    var self = this;
    this.get('/authenticate', {
        credentials: credentials
    }, function (err, body) {
        if (err) {
            callback(err);
        } else {
            self.userData = body;
            callback(null, body);
        }
    });
};

session.searchPatients = function (searchParam, callback) {
    this.get('/patientsByName', {
        prefix: searchParam['name.full']
    }, function (err, body) {
        if (err) {
            callback(err);
        } else {
            callback(null, body);
        }
    });
};

session.getDemographics = function (patientId, callback) {
    this.get('/patientSummary', {
        id: patientId
    }, function (err, body) {
        if (err) {
            callback(err);
        } else {
            callback(null, body);
        }
    });
};

exports.newSession = function (callback) {
    var c = Object.create(session);
    c.get('/initiate', null, function (err, body) {
        if (err) {
            callback(err);
        } else {
            c.Authorization = body.Authorization;
            c.key = body.key;
            callback(null, c);
        }
    });
};
