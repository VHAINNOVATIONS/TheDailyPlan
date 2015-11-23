"use strict";

var util = require('util');
var _ = require('lodash');
var request = require('request');

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
    if (parameters) {
        options.qs = parameters;
    }
    request.get(options, function (err, response, body) {
        console.log(JSON.stringify(response, undefined, 4));
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

exports.newSession = function (callback) {
    var c = Object.create(session);
    c.get('/initiate', null, function (err, body) {
        if (err) {
            callback(err);
        } else {
            callback(null, c);
        }
    });
};
