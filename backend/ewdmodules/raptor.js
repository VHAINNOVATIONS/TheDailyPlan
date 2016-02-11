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
var userLib = require('vistaUserLib');
var patientLib = require('vistaPatientLib');

// REST & Web Service error response formatter function
// Updated 20150820a

var operations = {
    initiate: {
        GET: function(ewd) {
            return vista.initiate('raptor', ewd);
        }
    },
    login: {
        GET: function(ewd, session) {
            return vista.login(ewd, session);
        }
    },

    getWorklistDetailsMap: {
        GET: function(ewd, session) {
            var ok = ewd.util.restoreSymbolTable(ewd, session); //Flush symbol table and replace with ours
            var params = {
                max: ewd.query.max,
                from: ewd.query.from // joel 8-11-15 -> added for pagination
            };
            // joel - 8/29/15 adding to enable filtering per PHP code
            params.filterDiscontinued = false;
            if (ewd.query.hasOwnProperty('filterDiscontinued') && ewd.query['filterDiscontinued'] !== '') {
                if (ewd.query['filterDiscontinued'].toUpperCase() == 'TRUE') {
                    params.filterDiscontinued = true;
                }
            }

            var results = vista.getWorklist(params, session, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session); //Grab our symbol table for use next time
            return results;
        }
    },

    getDashboardDetailsMap: {
        GET: function(ewd, session) {
            var ok = ewd.util.restoreSymbolTable(ewd, session); //Flush symbol table and replace with ours

            var params = {
                file: '75.1', // joel changed from 100 -> 75.1
                iens: [ewd.query.ien]
            };
            var radiologyOrder = vista.ddrGetsEntry2(params, session, ewd);

            var correspondingOrderFileIen = radiologyOrder['7']['I'];
            params = {
                file: '100',
                iens: [correspondingOrderFileIen]
            };
            var orderFileRec = vista.ddrGetsEntry2(params, session, ewd);

            ok = ewd.util.saveSymbolTable(ewd, session); //Grab our symbol table for use next time

            return {
                'radiologyOrder': radiologyOrder,
                'order': orderFileRec
            };
        }
    },

    getAllergiesDetailMap: {
        GET: function(ewd, session) {
            var params = {
                patientId: ewd.query.patientId
            };
            var ok = ewd.util.restoreSymbolTable(ewd, session); //Flush symbol table and replace with ours
            var result = allergiesLib.getAllergies(params, session, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session); //Grab our symbol table for use next time
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
            var ok = ewd.util.restoreSymbolTable(ewd, session); //Flush symbol table and replace with ours
            var result = vista.getHospitalLocations(params, session, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session); //Grab our symbol table for use next time
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
            var ok = ewd.util.restoreSymbolTable(ewd, session); //Flush symbol table and replace with ours
            var result = chemHemLib.getChemHemReports(params, session, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session); //Grab our symbol table for use next time
            return result;
        }
    },

    getImagingTypesMap: {
        GET: function(ewd, session) {
            var ok = ewd.util.restoreSymbolTable(ewd, session); //Flush symbol table and replace with ours
            var result = vista.getImagingOrderTypes({}, session, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session); //Grab our symbol table for use next time
            return result;
        }
    },

    getMedicationsDetailMap: {
        GET: function(ewd, session) {
            var ok = ewd.util.restoreSymbolTable(ewd, session); //Flush symbol table and replace with ours
            var result = medsLib.getAllMeds({
                patientId: ewd.query.patientId
            }, session, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session); //Grab our symbol table for use next time
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
            var ok = ewd.util.restoreSymbolTable(ewd, session); //Flush symbol table and replace with ours
            var result = vista.getNotesWithText(params, session, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session); //Grab our symbol table for use next time
            return result;
        }
    },

    getOrderableItems: {
        GET: function(ewd, session) {
            var ok = ewd.util.restoreSymbolTable(ewd, session); //Flush symbol table and replace with ours
            var result = vista.getOrderableItems({
                dialogId: ewd.query.dialogId
            }, session, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session); //Grab our symbol table for use next time
            return result;
        }
    },

    getPathologyReportsDetailMap: {
        GET: function(ewd, session) {
            var params = {
                patientId: ewd.query.patientId,
                fromDate: ewd.query.fromDate,
                toDate: ewd.query.toDate,
                nRpts: ewd.query.nRpts
            };
            var ok = ewd.util.restoreSymbolTable(ewd, session); //Flush symbol table and replace with ours
            var result = vista.getSurgicalPathologyReports(params, session, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session); //Grab our symbol table for use next time
            return result;
        }
    },

    getPatientIDFromTrackingID: {
        GET: function(ewd, session) {
            var params = {
                ien: ewd.query.ien
            };
            //var ok = ewd.util.restoreSymbolTable(ewd, session);	//Flush symbol table and replace with ours
            var result = vista.getPatientIDFromTrackingID(params, session, ewd);
            //var ok = ewd.util.saveSymbolTable(ewd, session);	//Grab our symbol table for use next time
            return result;
        }
    },

    getPatientMap: {
        GET: function(ewd, session) {
            var ok = ewd.util.restoreSymbolTable(ewd, session); //Flush symbol table and replace with ours
            var result = patientLib.selectPatient({
                patientId: ewd.query.patientId
            }, session, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session); //Grab our symbol table for use next time
            return result;
        }
    },

    getProblemsListDetailMap: {
        GET: function(ewd, session) {
            var params = {
                patientId: ewd.query.patientId,
                type: ewd.query.type || ''
            };
            var ok = ewd.util.restoreSymbolTable(ewd, session); //Flush symbol table and replace with ours
            var result = vista.getProblemList(params, session, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session); //Grab our symbol table for use next time
            return result;
        }
    },

    getProviders: {
        GET: function(ewd, session) {
            var ok = ewd.util.restoreSymbolTable(ewd, session); //Flush symbol table and replace with ours
            var result = userLib.cprsUserLookup({
                target: ewd.query.target
            }, session, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session); //Grab our symbol table for use next time
            return result;
        }
    },

    getRadiologyReportsDetailMap: {
        GET: function(ewd, session) {
            var params = {
                patientId: ewd.query.patientId,
                fromDate: ewd.query.fromDate,
                toDate: ewd.query.toDate,
                nRpts: ewd.query.nRpts
            };
            var ok = ewd.util.restoreSymbolTable(ewd, session); //Flush symbol table and replace with ours
            var result = vista.getRadiologyReports(params, session, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session); //Grab our symbol table for use next time
            return result;
        }
    },

    getRawVitalSignsMap: {
        GET: function(ewd, session) {
            var params = {
                patientId: ewd.query.patientId
            };
            var ok = ewd.util.restoreSymbolTable(ewd, session); //Flush symbol table and replace with ours
            var result = vista.getVitalSigns(params, session, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session); //Grab our symbol table for use next time
            return result;
        }
    },

    getPostings: {
        GET: function(ewd, session) {
            var params = {
                patientId: ewd.query.patientId
            };
            var ok = ewd.util.restoreSymbolTable(ewd, session); //Flush symbol table and replace with ours
            var result = postingsLib.getPostings(params, session, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session); //Grab our symbol table for use next time
            return result;
        }
    },

    getImmunizations: {
        GET: function(ewd, session) {
            var params = {
                patientId: ewd.query.patientId
            };
            var ok = ewd.util.restoreSymbolTable(ewd, session); //Flush symbol table and replace with ours

            params.rpcName = 'ORQQPX IMMUN LIST';
            params.rpcArgs = [{
                type: 'LITERAL',
                value: params.patientId
            }];
            var result = vista.runRpc(params, session, ewd);

            ok = ewd.util.saveSymbolTable(ewd, session); //Grab our symbol table for use next time
            return result;
        }
    },

    getUserSecurityKeys: {
        GET: function(ewd, session) {
            var ok = ewd.util.restoreSymbolTable(ewd, session); //Flush symbol table and replace with ours
            var result = userLib.getUserSecurityKeys(ewd.query.uid || ewd.query.providerId, session, ewd); // accept uid or providerId as arg
            ok = ewd.util.saveSymbolTable(ewd, session); //Grab our symbol table for use next time
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
            var ok = ewd.util.restoreSymbolTable(ewd, session); //Flush symbol table and replace with ours
            var result = vista.getVisits(params, session, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session); //Grab our symbol table for use next time
            return result;
        }
    },

    getAllOrders: {
        GET: function(ewd, session) {
            var params = {
                patientId: ewd.query.patientId,
                vistANow: ewd.query.vistANow
            };
            var ok = ewd.util.restoreSymbolTable(ewd, session); //Flush symbol table and replace with ours
            var result = ordersLib.getAllOrders(params, session, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session); //Grab our symbol table for use next time
            return result;
        }
    },

    getOrderTypes: {
        GET: function(ewd, session) {
            var params = {};
            var ok = ewd.util.restoreSymbolTable(ewd, session); //Flush symbol table and replace with ours
            var result = ordersLib.getOrderTypes(params, session, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session); //Grab our symbol table for use next time
            return result;
        }
    },

    getClinics: {
        GET: function(ewd, session) {
            var ok = ewd.util.restoreSymbolTable(ewd, session); //Flush symbol table and replace with ours
            var result = patientSearchLib.getClinics(session, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session); //Grab our symbol table for use next time
            return result;
        }
    },

    getWards: {
        GET: function(ewd, session) {
            var ok = ewd.util.restoreSymbolTable(ewd, session); //Flush symbol table and replace with ours
            var result = patientSearchLib.getWards(session, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session); //Grab our symbol table for use next time
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
            var ok = ewd.util.restoreSymbolTable(ewd, session); //Flush symbol table and replace with ours
            var result = patientSearchLib.getPatientsByClinic(params, session, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session); //Grab our symbol table for use next time
            return result;
        }
    },

    getPatientsByWard: {
        GET: function(ewd, session) {
            var params = {
                wardId: ewd.query.wardId
            };
            var ok = ewd.util.restoreSymbolTable(ewd, session); //Flush symbol table and replace with ours
            var result = patientSearchLib.getPatientsByWard(params, session, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session); //Grab our symbol table for use next time
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
            var ok = ewd.util.restoreSymbolTable(ewd, session); //Flush symbol table and replace with ours
            var result = healthFactorsLib.getPatientHealthFactors(params, session, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session); //Grab our symbol table for use next time
            return result;
        }
    },

    resolveBPs: {
        GET: function(ewd, session) {
            var params = {
                patientId: ewd.query.patientId,
                text: ewd.query.text || ''
            };
            var ok = ewd.util.restoreSymbolTable(ewd, session); //Flush symbol table and replace with ours                                                            
            var result = tiuLib.resolveBoilerplates(params, session, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session); //Grab our symbol table for use next time                                                             
            return result;
        }
    },

    validateEsig: {
        GET: function(ewd, session) {
            var ok = ewd.util.restoreSymbolTable(ewd, session); //Flush symbol table and replace with ours
            var tf = vista.isValidESig({
                eSig: ewd.query.eSig
            }, session, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session); //Grab our symbol table for use next time
            return {
                result: tf
            };
        }
    },

    patientsByName: {
        GET: function(ewd, session) {
            var ok = ewd.util.restoreSymbolTable(ewd, session); //Flush symbol table and replace with ours
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
            ok = ewd.util.saveSymbolTable(ewd, session); //Grab our symbol table for use next time
            return result;
        }
    },

    patientSummary: {
        GET: function(ewd, session) {
            var ok = ewd.util.restoreSymbolTable(ewd, session); //Flush symbol table and replace with ours
            var result = vista.getPatientSummaryDetails(ewd.query.id, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session); //Grab our symbol table for use next time
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
    }

};
