"use strict";

var util = require('util');
var _ = require('lodash');
var request = require('request');

var session = {
    baseUrl: 'https://ehmp.vaftl.us'
};

session.get = function (route, callback) {
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
};

session.resource = function (key, parameters, callback) {
    if (!callback) {
        callback = parameters;
        parameters = null;
    }
    var e = this.resourceDirectory[key];
    if (!e) {
        var invalidKeyMsg = util.format('Invalid resource key %s', key);
        callback(new Error(invalidKeyMsg));
        return;
    }
    var rel = e.rel;
    if (rel === 'vha.read') {
        this.get(e.href, callback);
    } else if (rel === 'vha.post') {

    } else if (rel === 'vha.delete') {

    } else {
        var unimplementedMsg = util.format('Unimplemented option %s', rel);
        callback(new Error(unimplementedMsg));
    }
};

session.login = function (userOptions, callback) {
    this.call('authentication-authentication', userOptions, function (err) {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
    });
};

session.logout = function (callback) {
    this.call('authentication-destroySession', function (err) {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
    });
};

exports.newSession = function (callback) {
    var c = Object.create(session);
    c.get('/resource/resourceDirectory', function (err, body) {
        if (err) {
            callback(err);
        } else {
            c.resourceDirectory = body.data.link.reduce(function (r, d) {
                r[d.title] = d;
                return r;
            }, {});
            c.resource('locations-facility-monikers', function (err, body) {
                if (err) {
                    callback(err);
                } else {
                    c.facilityMonikers = body;
                    c.resource('authentication-list', function (err, body) {
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
