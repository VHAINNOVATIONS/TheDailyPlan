'use strict';

var async = require('async');
var _ = require('lodash');

var getters = {};

getters.Demographics = function(session, userSession, patientId, details, callback) {
    session.getDemographics(userSession, patientId, {}, callback);
};

getters.Allergies = function(session, userSession, patientId, details, callback) {
    session.getAllergies(userSession, patientId, {}, callback);
};

var getSection = function(sectionTitle, getter) {
    return function(session, userSession, patientId, details, callback) {
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
    var fnDemRaw = getSection('Demographics', getters.Demographics);
    fns.push(_.partial(fnDemRaw, input.session, input.userSession, input.patientId, []));

    async.parallel(fns, function(err, dataAsArray) {
        if (err) {
            return callback(err);
        }
        var result = dataAsArray.reduce(function(r, p) {
            r[p.section]= p.data;
            return r;
        }, {});
        callback(null, result);
    });
};
