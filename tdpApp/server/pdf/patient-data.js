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

getters['Health Factors'] = function(session, userSession, patientId, details, callback) {
    var options = {};
    if (details) {
        options = details.reduce(function(r, detail) {
            if (detail.name === 'Include Factors') {
                r.includeFactors.push(detail.value);
            }
            return r;
        }, {
            includeFactors: []
        });
    }
    session.getHealthFactors(userSession, patientId, options, callback);
};

getters.Immunizations = function(session, userSession, patientId, details, callback) {
    session.getImmunizations(userSession, patientId, {}, callback);
};

var freeText = function(session, userSession, patientId, details, callback) {
    var content = '';
    var title = '';
    if (details) {
        details.forEach(function(detail) {
            if (detail.name === 'Content') {
                content = detail.value || '';
            }
            if (detail.name === 'Title') {
                title = detail.value;
            }
        });
    }
    var tius = content.match(/\|[^\|]+\|/g);
    if (tius && tius.length) {
        session.getBoilerplates(userSession, patientId, {
            text: content
        },  function(err, value) {
            if (err) {
                return callback(err);
            }
            callback(null, {
                content: content,
                title: title
            })
            content = value;
        });
    } else {
        callback(null, {
            content: content,
            title: title
        })
    }
};

getters['Free Text 1'] = freeText;
getters['Free Text 2'] = freeText;
getters['Free Text 3'] = freeText;

getters.Labs = function(session, userSession, patientId, details, callback) {
    var options = {
        testNames: [],
        occurances: '3'
    };
    if (details) {
        options = details.reduce(function(r, detail) {
            if (detail.name === 'Test Names') {
                r.testNames.push(detail.value);
            } else if (detail.name === 'Occurences') {
                r.occurances = detail.value;
            }
            return r;
        }, {
            testNames: [],
            occurances: '3'
        });
    }
    options.occurances = parseInt(options.occurances, 10);
    session.getChemHemReports(userSession, patientId, options, callback);
};

getters['IV Medications'] = function(session, userSession, patientId, details, callback) {
    session.getMedications(userSession, patientId, {
        type: 'iv'
    }, callback);
};

getters['Inpatient Medications'] = function(session, userSession, patientId, details, callback) {
    session.getMedications(userSession, patientId, {
        type: 'inpatient'
    }, callback);
};

getters['Outpatient Medications'] = function(session, userSession, patientId, details, callback) {
    session.getMedications(userSession, patientId, {
        type: 'outpatient'
    }, callback);
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
