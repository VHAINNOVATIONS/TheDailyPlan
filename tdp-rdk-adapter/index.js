"use strict";

var rdkAdapter = require('./lib/rdk-adapter');

exports.newSession = function (callback) {
    var rdkOptions = {
        baseUrl: 'https://ehmp.vaftl.us'
    };
    rdkAdapter.newSession(rdkOptions, callback);
};
