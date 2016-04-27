'use strict';

var async = require('async');
var _ = require('lodash');

var getters = {};

getters.Allergies = function(session, userSession, patientId, details, callback) {
    session.getAllergies(userSession, patientId, {}, callback);
};

var getSection = function(sectionTitle, getter) {
    return function(session, userSession, patientId, details, callback) {
        console.log('==============');
        console.log(session);
        console.log(userSession);
        console.log(patientId);
        console.log(details);
        console.log('==============');
        getter(session, userSession, patientId, details, function(err, data) {
            if (err) {
                return callback(err);
            }
            callback(null, {
                section: sectionTitle,
                data: data
            })
        });
    };
};

var noop = function(sectionTitle) {
    return function(callback) {
        callback(null, {
            section: sectionTitle,
            data: null
        });
    }
};

module.exports = function(input, callback) {
    var fns = input.template.map(function(panel) {
        var section = panel.section;
        var g = getters[section];
        if (g) {
            var fnRaw = getSection(section, g);
            var fn = _.partial(fnRaw, input.session, input.userSession, input.patientId, panel.details);
            return fn
        } else {
            return noop(section);
        }
    });
    async.parallel(fns, function(err, results) {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
};
