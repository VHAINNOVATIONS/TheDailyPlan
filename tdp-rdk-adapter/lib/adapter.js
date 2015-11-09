"use strict";

var util = require('util');
var _ = require('lodash');
var request = require('request');

var session = {
    baseUrl: 'https://ehmp.vaftl.us',
    get: function (route, callback) {
        var options = _.assign({
            uri: this.baseUrl + route
        }, {
            method: 'GET',
            json: true,
            strictSSL: false
        });
        request.get(options, function (err, response, body) {
            if ((!err) && response.statusCode !== 200) {
                var message = util.format('Invalid response status for %s: %s', options.uri, response.statusCode);
                err = new Error(message);
            }
            if (err) {
                callback(err);
            } else {
                callback(null, body);
            }
        });
    },
    authenticate: function (userOptions, callback) {}
};

exports.newSession = function (callback) {
    var c = Object.create(session);
    c.get('/resource/resourceDirectory', function (err, body) {
        if (err) {
            callback(err);
        } else {
            c.resourceDirectory = body;
            c.get('/resource/locations/facility-monikers', function (err, body) {
                if (err) {
                    callback(err);
                } else {
                    c.facilityMonikers = body;
                    c.get('/resource/authentication/list', function (err, body) {
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
