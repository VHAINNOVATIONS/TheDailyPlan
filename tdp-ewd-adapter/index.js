"use strict";

var config = require('./config');

var ewdAdapter = require('./lib/ewd-adapter');

exports.newSession = function (callback) {
    var ewdOptions = {
        baseUrl: (config.ewdServerSSL ? 'https' : 'http') + '://' + config.tdpEwdRestHost + ':' + config.tdpEwdRestPort + '/' + config.ewdServerName + '/' + config.ewdServiceName
    };
    ewdAdapter.newSession(ewdOptions, callback);
};
