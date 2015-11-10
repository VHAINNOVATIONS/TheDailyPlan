"use strict";

var util = require('util');
var _ = require('lodash');
var request = require('request');

request = request.defaults({
    jar: true
});

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

session.post = function (route, parameters, callback) {
    var options = _.assign({
        uri: this.baseUrl + route
    }, {
        method: 'POST',
        json: parameters,
        strictSSL: false
    });
    request.post(options, function (err, response, body) {
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

session.delete = function (route, callback) {
    var options = _.assign({
        uri: this.baseUrl + route
    }, {
        method: 'DELETE',
        json: this.userData,
        body: this.userData,
        strictSSL: false
    });
    request(options, function (err, response, body) {
        if ((!err) && response.statusCode !== 200) {
            var message = util.format('Invalid response status for %s: %s', options.uri, response.statusCode);
            err = new Error(message);
        }
        if (err) {
            callback(err);
        } else {
            callback(null);
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
    } else if (rel === 'vha.create') {
        var defParameters = e.parameters.post;
        var unrecognizedParameters = Object.keys(parameters).reduce(function (r, key) {
            if (!defParameters[key]) {
                r.push(key);
            }
            return r;
        }, []);
        if (unrecognizedParameters.length) {
            var unrecognizedMessage = util.format('Unrecognized parameters: %s', unrecognizedParameters.join());
            callback(new Error(unrecognizedMessage));
            return;
        }
        var missingParameters = Object.keys(defParameters).reduce(function (r, key) {
            if (defParameters[key].required && !parameters.hasOwnProperty(key)) {
                r.push(key);
            }
            return r;
        }, []);
        if (missingParameters.length) {
            var missingMessage = util.format('Unrecognized parameters: %s', missingParameters.join());
            callback(new Error(missingMessage));
            return;
        }
        this.post(e.href, parameters, callback);
    } else if (rel === 'vha.delete') {
        this.delete(e.href, callback);
    } else {
        var unimplementedMsg = util.format('Unimplemented option %s', rel);
        callback(new Error(unimplementedMsg));
    }
};

session.login = function (userOptions, callback) {
    var self = this;
    this.resource('authentication-authentication', userOptions, function (err, body) {
        if (err) {
            callback(err);
        } else {
            self.userData = body.data;
            callback(null);
        }
    });
};

session.logout = function (callback) {
    this.resource('authentication-destroySession', function (err) {
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
