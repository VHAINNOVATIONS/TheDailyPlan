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
        occurances: '3',
        backDays: '30',
        isvertical: '1'
    };
    if (details) {
        options = details.reduce(function(r, detail) {
            if (detail.name === 'Test Names') {
                r.testNames.push(detail.value);
            } else if (detail.name === 'Occurences') {
                r.occurances = detail.value;
            } else if(detail.name === 'Back Days'){
                r.backDays = detail.value;
            }else if(detail.name === 'Test Names as PDF Table Header'){
                r.isvertical = detail.value;
            }
            return r;
        }, {
            testNames: [],
            occurances: '3',
            backDays: '30',
            isvertical: '1'
        });
    }
    options.occurances = parseInt(options.occurances, 10);
    options.backDays = parseInt(options.backDays, 10);
    session.getChemHemReports(userSession, patientId, options, function(err, result) {
        if (err) {
            return callback(err);
        }
        callback(null, {
            data: result,
            testNames: options.testNames,
            isvertical: options.isvertical
        })
    });
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

getters['Pending Lab Orders'] = function(session, userSession, patientId, details, callback) {
    session.getOrders(userSession, patientId, {}, function(err, data) {
        var typedData = (data && data.labOrders) || [];
        callback(null, typedData);
    });
};

getters['Diet Orders'] = function(session, userSession, patientId, details, callback) {
    session.getOrders(userSession, patientId, {}, function(err, data) {
        var typedData = (data && data.currentDietProfile) || [];
        callback(null, typedData);
    });
};

getters['Pending Radiology Orders'] = function(session, userSession, patientId, details, callback) {
    session.getOrders(userSession, patientId, {}, function(err, data) {
        var typedData = (data && data.radiologyOrders) || [];
        callback(null, typedData);
    });
};

getters['Pending Procedures'] = function(session, userSession, patientId, details, callback) {
    var futureDays = '30';
    details.forEach(function(detail) {
        if (detail.name === 'Future Days') {
            futureDays = detail.value || '30';
        }
    });
    futureDays = parseInt(futureDays, 10);
    session.getOrders(userSession, patientId, {
        futureDays: futureDays
    }, function(err, data) {
        var typedData = (data && data.procedures) || [];
        callback(null, typedData);
    });
};

getters.Visits = function(session, userSession, patientId, details, callback) {
    var futureDays = '30';
    details.forEach(function(detail) {
        if (detail.name === 'Future Days') {
            futureDays = detail.value || '30';
        }
    });
    futureDays = parseInt(futureDays, 10);
    session.getVisits(userSession, patientId, {
        numDaysFuture: futureDays
    }, callback);
};

getters['Pending Consults'] = function(session, userSession, patientId, details, callback) {
    session.getConsults(userSession, patientId, {}, callback);
};

getters['Vital Signs'] = function(session, userSession, patientId, details, callback) {
    var options = {
        occurances: '3',
        backdays: '30'
    };
    if (details) {
        options = details.reduce(function(r, detail) {
            if (detail.name === 'Occurences') {
                r.occurances = detail.value;
            }else if(detail.name === 'Back Days'){
                r.backdays = detail.value;
            }
            return r;
        }, {
            occurances: '3',
            backdays: '30'
        });
    }
    options.occurances = parseInt(options.occurances, 10);
    options.backdays = parseInt(options.backdays,10);

    session.getVitalSigns(userSession, patientId, options, function(err, vitals) {
        var vitalSets = vitals.reduce(function(r, vital) {
            var dateTime = vital.dateTime;
            var v = {
              date: dateTime,
            };
            ['temperature', 'pulse', 'bloodPressure', 'weight', 'pain', 'respiration'].forEach(function(type) {
                var value = vital[type] && vital[type].value;
                v[type] = value;
            });
            r.push(v);
            return r;
        }, []);
        callback(null, vitalSets);
    });
};

getters.Postings = function(session, userSession, patientId, details, callback) {
    var options = {};
    if (details) {
        options = details.reduce(function(r, detail) {
            if (detail.name === 'Include Types') {
                r.includeTypes.push(detail.value);
            }
            return r;
        }, {
            includeTypes: []
        });
    }
    session.getPostings(userSession, patientId, options, callback);
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
    var demographicsSections = {
        'Providers': false,
        'Contacts': false
    };

    var fns = input.template.reduce(function(r, panel) {
        var section = panel.section;
        var g = getters[section];
        if (g) {
            var fnRaw = getSection(section, g);
            var fn = _.partial(fnRaw, input.session, input.userSession, input.patientId, panel.details);
            r.push(fn);
        } else if (demographicsSections.hasOwnProperty(section)) {
            demographicsSections[section] = true;
        } else {
            r.push(noop(section));
        }
        return r;
    }, []);
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
        if (demographicsSections.Providers) {
            var provData = {};
            provData.admittingProvider = _.get(result.Demographics, 'admissionInfo.attendingProvider');
            provData.admittingDiagnosis = _.get(result.Demographics, 'admissionInfo.diagnosis');
            provData.attendingProvider = _.get(result.Demographics, 'team.attendingName');
            provData.inpatientProvider = _.get(result.Demographics, 'team.inpatientName');
            result.Providers = provData;
        }
        if (demographicsSections.Contacts) {
            var contactData = {};
            contactData.nextOfKin = _.get(result.Demographics, 'nextOfKin');
            contactData.emergencyContact = _.get(result.Demographics, 'emergencyContact');
            result.Contacts = contactData;
        }
        callback(null, result);
    });
};
