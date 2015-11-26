"use strict";

var config = require('./config');

var adapter = require('./lib/adapter');

exports.newSession = function (callback) {
    var options = {
        baseUrl: (config.ewdServerSSL ? 'https' : 'http') + '://' + config.tdpEwdRestHost + ':' + config.tdpEwdRestPort + '/' + config.ewdServerName + '/' + config.ewdServiceName
    };
    adapter.newSession(options, callback);
};
