"use strict";

var util = require('util');
var request = require('request');

var baseUrl = 'https://ehmp.vaftl.us';

var session = {
    authenticate: function (userOptions, callback) {}
};

exports.newSession = function (callback) {
    var options = {
        method: 'GET',
        uri: baseUrl + '/resource/resourceDirectory',
        json: true,
        strictSSL: false
    };
    request.get(options, function (err, response, body) {
        if (err) {
            callback(err);
        } else {
            var c = Object.create(session);
            c.resourceDirectory = body;
            var options = {
                method: 'GET',
                uri: baseUrl + '/resource/locations/facility-monikers',
                json: true,
                strictSSL: false
            };
            request.get(options, function (err, response, body) {
                if (err) {
                    callback(err);
                } else {
                    c.facilityMonikers = body;
                    var options = {
                        method: 'GET',
                        uri: baseUrl + '/resource/authentication/list',
                        json: true,
                        strictSSL: false
                    };
                    request.get(options, function (err, response, body) {
                        if (!err && response.statusCode !== 200) {
                            var message = util.format('Invalid response status for %s: %s', options.uri, response.statusCode);
                            err = new Error(message);
                        }
                        if (err) {
                            callback(err);
                        } else {
                            c.facilityList = body;
                            callback(null, c);
                        }
                    });
                }
            });
        }
    });
};
