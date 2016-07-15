'use strict';

var vista = require('VistALib');
var ordersLib = require('./vistaOrders');
var patientSearchLib = require('./vistaPatientSearch');
var healthFactorsLib = require('./vistaHealthFactors');
var postingsLib = require('./vistaPostingsLib');
var tiuLib = require('./vistaTiuLib');
var chemHemLib = require('vistaChemHemLib');
var allergiesLib = require('vistaAllergiesLib');
var medsLib = require('vistaMedsLib');
var patientLib = require('vistaPatientLib');

// REST & Web Service error response formatter function
// Updated 20150820a

var operations = {
    initiate: {
        GET: function(ewd) {
            return vista.initiate('tdp', ewd);
        }
    },
    login: {
        GET: function(ewd, session) {
            return vista.login(ewd, session);
        }
    },
    getAllergies: {
        GET: function(ewd, session) {
            var params = {
                patientId: ewd.query.patientId
            };
            var ok = vista.restoreSymbolTable(ewd, session);
            var result = allergiesLib.getAllergies(params, session, ewd);
            return result;
        }
    },
    // per call to RPC, returns 44 results beginning alphabetically at 'target'
    getHospitalLocationsMap: {
        GET: function(ewd, session) {
            var params = {
                target: ewd.query.target,
                direction: ewd.query.direction
            };
            var ok = vista.restoreSymbolTable(ewd, session);
            var result = vista.getHospitalLocations(params, session, ewd);
            return result;
        }
    },
    getChemHemLabs: {
        GET: function(ewd, session) {
            var params = {
                patientId: ewd.query.patientId,
                fromDate: ewd.query.fromDate,
                toDate: ewd.query.toDate
            };
            var ok = vista.restoreSymbolTable(ewd, session);
            var result = chemHemLib.getChemHemReports(params, session, ewd);
            return result;
        }
    },
    getTestNames: {
        GET: function(ewd, session) {
            var ok = vista.restoreSymbolTable(ewd, session);
            var result = chemHemLib.getTestNames(session, ewd);
            return result;
        }
    },
    getImagingTypesMap: {
        GET: function(ewd, session) {
            var ok = vista.restoreSymbolTable(ewd, session);
            var result = vista.getImagingOrderTypes({}, session, ewd);
            return result;
        }
    },
    getMedications: {
        GET: function(ewd, session) {
            var ok = vista.restoreSymbolTable(ewd, session);
            var result = medsLib.getAllMeds({
                patientId: ewd.query.patientId
            }, session, ewd);
            return result;
        }
    },
    getNotesDetailMap: {
        GET: function(ewd, session) {
            var params = {
                patientId: ewd.query.patientId,
                fromDate: '0',
                toDate: '0'
            };
            var ok = vista.restoreSymbolTable(ewd, session);
            var result = vista.getNotesWithText(params, session, ewd);
            return result;
        }
    },

    getOrderableItems: {
        GET: function(ewd, session) {
            var ok = vista.restoreSymbolTable(ewd, session);
            var result = vista.getOrderableItems({
                dialogId: ewd.query.dialogId
            }, session, ewd);
            return result;
        }
    },
    getPatientMap: {
        GET: function(ewd, session) {
            var ok = vista.restoreSymbolTable(ewd, session);
            var result = patientLib.selectPatient({
                patientId: ewd.query.patientId
            }, session, ewd);
            return result;
        }
    },
    getRawVitalSignsMap: {
        GET: function(ewd, session) {
            var params = {
                patientId: ewd.query.patientId
            };
            var ok = vista.restoreSymbolTable(ewd, session);
            var result = vista.getVitalSigns(params, session, ewd);
            return result;
        }
    },
    getPostings: {
        GET: function(ewd, session) {
            var params = {
                patientId: ewd.query.patientId
            };
            var ok = vista.restoreSymbolTable(ewd, session);
            var result = postingsLib.getPostings(params, session, ewd);
            return result;
        }
    },
    getPostingTypes: {
        GET: function(ewd, session) {
            var ok = vista.restoreSymbolTable(ewd, session);
            var result = postingsLib.getPostingTypes(session, ewd);
            return result;
        }
    },
    getImmunizations: {
        GET: function(ewd, session) {
            var params = {
                patientId: ewd.query.patientId
            };
            var ok = vista.restoreSymbolTable(ewd, session);

            params.rpcName = 'ORQQPX IMMUN LIST';
            params.rpcArgs = [{
                type: 'LITERAL',
                value: params.patientId
            }];
            var result = vista.runRpc(params, session, ewd);
            return result;
        }
    },
    getVisits: {
        GET: function(ewd, session) {
            var params = {
                patientId: ewd.query.patientId,
                fromDate: ewd.query.fromDate,
                toDate: ewd.query.toDate
            };
            var ok = vista.restoreSymbolTable(ewd, session);
            var result = vista.getVisits(params, session, ewd);
            return result;
        }
    },
    getAllOrders: {
        GET: function(ewd, session) {
            var params = {
                patientId: ewd.query.patientId,
                vistANow: ewd.query.vistANow
            };
            var ok = vista.restoreSymbolTable(ewd, session);
            var result = ordersLib.getAllOrders(params, session, ewd);
            return result;
        }
    },
    getConsults: {
        GET: function(ewd, session) {
            var params = {
                patientId: ewd.query.patientId
            };
            var ok = vista.restoreSymbolTable(ewd, session);
            var result = ordersLib.getConsults(params, session, ewd);
            return result;
        }
    },
    getOrderTypes: {
        GET: function(ewd, session) {
            var params = {};
            var ok = vista.restoreSymbolTable(ewd, session);
            var result = ordersLib.getOrderTypes(params, session, ewd);
            return result;
        }
    },

    getClinics: {
        GET: function(ewd, session) {
            var ok = vista.restoreSymbolTable(ewd, session);
            var result = patientSearchLib.getClinics(session, ewd);
            return result;
        }
    },
    getWards: {
        GET: function(ewd, session) {
            var ok = vista.restoreSymbolTable(ewd, session);
            var result = patientSearchLib.getWards(session, ewd);
            return result;
        }
    },
    getPatientsByClinic: {
        GET: function(ewd, session) {
            var params = {
                clinicId: ewd.query.clinicId,
                fromDate: ewd.query.fromDate,
                toDate: ewd.query.toDate
            };
            var ok = vista.restoreSymbolTable(ewd, session);
            var result = patientSearchLib.getPatientsByClinic(params, session, ewd);
            return result;
        }
    },
    getPatientsByWard: {
        GET: function(ewd, session) {
            var params = {
                wardId: ewd.query.wardId
            };
            var ok = vista.restoreSymbolTable(ewd, session);
            var result = patientSearchLib.getPatientsByWard(params, session, ewd);
            return result;
        }
    },
    getPatientHealthFactors: {
        GET: function(ewd, session) {
            var params = {
                patientId: ewd.query.patientId,
                fromDate: ewd.query.fromDate || '',
                toDate: ewd.query.toDate || ''
            };
            var ok = vista.restoreSymbolTable(ewd, session);
            var result = healthFactorsLib.getPatientHealthFactors(params, session, ewd);
            return result;
        }
    },
    getSystemHealthFactors: {
        GET: function(ewd, session) {
            var ok = vista.restoreSymbolTable(ewd, session);
            var result = healthFactorsLib.getSystemHealthFactors(session, ewd);
            return result;
        }
    },
    resolveBPs: {
        GET: function(ewd, session) {
            var params = {
                patientId: ewd.query.patientId,
                text: ewd.query.text || ''
            };
            var ok = vista.restoreSymbolTable(ewd, session);                                                            
            var result = tiuLib.resolveBoilerplates(params, session, ewd);
            return result;
        }
    },
    patientsByName: {
        GET: function(ewd, session) {
            var ok = vista.restoreSymbolTable(ewd, session);
            var result;
            var prefix = ewd.query.prefix;
            if (prefix.match(/^[A-Z]?\d{4}$/i)) {
                result = patientSearchLib.getPatientsLast5(prefix, session, ewd);
            } else if (prefix.match(/^\d{3}\-?\d{2}\-?\d{4}$/)) {
                result = patientSearchLib.getPatientsFullSSN(prefix, session, ewd);
            } else {
                var resultRaw = vista.getPatientsByName(prefix, 1000, ewd);
                result = resultRaw.results;
            }
            return result;
        }
    },
    patientSummary: {
        GET: function(ewd, session) {
            var ok = vista.restoreSymbolTable(ewd, session);
            var result = vista.getPatientSummaryDetails(ewd.query.id, ewd);
            return result;
        }
    }
};

module.exports = {
    parse: function(ewd) {
        var resource = ewd.query.rest_path.split('/')[1];
        var session;
        var method;
        if (resource === 'devtest') {
            //No authentication
            method = ewd.query.rest_method;
            return operations[resource][method](ewd, session);
        }
        if (resource !== 'initiate') {
            var status = vista.authenticate(ewd);
            if (status.error) {
                return status;
            }
            if (resource !== 'login') {
                var loggedInStatus = vista.loginStatus(status.session);
                if (loggedInStatus.error) {
                    return loggedInStatus;
                }
            }
            session = status.session;
        }
        method = ewd.query.rest_method;
        if (operations[resource] && operations[resource][method]) {
            return operations[resource][method](ewd, session);
        } else {
            return vista.errorResponse('Invalid Request', 401);
        }
    },
    initiate: function(ewd) {
	return operations.initiate.GET(ewd);
    },
    onMessage: {
	'EWD.form.login': function(params, ewd) {
	    if (params.username === '') {
		return 'You must enter an Access Code';
	    }
	    if (params.password === '') {
		return 'You must enter a Verify Code';
	    }
	    var result = vista.vistALogin(params.username, params.password, ewd);
	    if (result.error) {
		return result.error;
	    }
	    ewd.sendWebSocketMsg({
	        type: 'loggedIn',
		message: {
                    ok: true,
                   name: result.data.displayName
                }
            });
            return '';
	}
    } 
};
