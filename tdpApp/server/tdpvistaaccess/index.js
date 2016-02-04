"use strict";

var _ = require('lodash');

var config = require('./config');

var ewdAdapter = require('./lib/ewd-adapter');
var rdkAdapter = require('./lib/rdk-adapter');

exports.newSession = function (overrideConfig, callback) {
    if (callback) {
        var tempConfig = {};
        _.assign(tempConfig, config, overrideConfig);
        config = tempConfig;
    } else {
        callback = overrideConfig;
    }
    if (config.tdpVistAAccessType === 'EWD') {
        var ewdOptions = {
            baseUrl: (config.ewdServerSSL ? 'https' : 'http') + '://' + config.tdpEwdRestHost + ':',
            serverRoute: '/' + config.ewdServerName + '/' + config.ewdServiceName
        };
        var aliases = config.tdpEwdRestAlias.split('^');
        var ports = config.tdpEwdRestPort.split('^');
        ewdOptions.ports = {};
        for (var i=0; i<aliases.length; ++i) {
          ewdOptions.ports[aliases[i]] = ports[i];
        }
        ewdAdapter.newSession(ewdOptions, callback);
    } else if (config.tdpVistAAccessType === 'RDK') {
        var rdkOptions = {
            baseUrl: config.tdpRdkUrl
        };
        rdkAdapter.newSession(rdkOptions, callback);
    } else {
        callback(new Error('Unknown access type: ' + config.tdpVistAAccessType));
    }
};
