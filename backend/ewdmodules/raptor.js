var vista = require('VistALib');
var ordersLib = require('./vistaOrders');
var patientSearchLib = require('./vistaPatientSearch');
var healthFactorsLib = require('./vistaHealthFactors');
var postingsLib = require('./vistaPostingsLib');
var tiuLib = require('./vistaTiuLib');

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

    isActiveSession: {
        GET: function(ewd, session) {
            var ok = ewd.util.restoreSymbolTable(ewd, session);	//Flush symbol table and replace with ours
            var results = vista.isActiveSession(session, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session);	//Grab our symbol table for use next time
            return results;
        }
    },

    getWorklistDetailsMap: {
        GET: function(ewd, session) {
            var ok = ewd.util.restoreSymbolTable(ewd, session);	//Flush symbol table and replace with ours
            var params = {
                max: ewd.query.max,
                from: ewd.query.from // joel 8-11-15 -> added for pagination
            };
            // joel - 8/29/15 adding to enable filtering per PHP code
            params.filterDiscontinued = false;
            if (ewd.query.hasOwnProperty("filterDiscontinued") && ewd.query["filterDiscontinued"] != "") {
                if (ewd.query["filterDiscontinued"].toUpperCase() == "TRUE") {
                    params.filterDiscontinued = true;
                }
            }

            var results = vista.getWorklist(params, session, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session);	//Grab our symbol table for use next time
            return results;
        }
    },

    getDashboardDetailsMap: {
        GET: function(ewd, session) {
            var ok = ewd.util.restoreSymbolTable(ewd, session);	//Flush symbol table and replace with ours

            var params = {
                file: '75.1', // joel changed from 100 -> 75.1
                iens: [ewd.query.ien]
            };
            var radiologyOrder = vista.ddrGetsEntry2(params, session, ewd);

            var correspondingOrderFileIen = radiologyOrder["7"]["I"];
            params = {
                file: '100',
                iens: [correspondingOrderFileIen]
            };
            var orderFileRec = vista.ddrGetsEntry2(params, session, ewd);

            ok = ewd.util.saveSymbolTable(ewd, session);	//Grab our symbol table for use next time

            return { "radiologyOrder" : radiologyOrder, "order" : orderFileRec };
        }
    },

    cancelRadiologyOrder: {
        GET: function(ewd, session) {
            var params = {
                patientId: ewd.query.patientId,
                orderId: ewd.query.orderId,
                userId: ewd.query.userId,
                providerId: ewd.query.providerId,
                locationId: ewd.query.locationId,
                reasonId: ewd.query.reasonId,
                eSig: ewd.query.eSig
            };

            var ok = ewd.util.restoreSymbolTable(ewd, session);	//Flush symbol table and replace with ours
            var result = vista.discontinueRadiologyOrder(params, session, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session);	//Grab our symbol table for use next time
            return result;
        }
    },

    /* Some example valid values that successfully created and released a new order:

     params.patientId = "100856"; // BERRILLO test patient
     params.providerId = "10000000344"; // RADIOLOGIST,SEVEN
     params.userId = "10000000344";
     params.locationId = "136"; // BECKY'S CLINIC
     params.eSig = "RADIOLOGY7";
     params.dialogId = "37";
     params.orderableItemId = "3326"; // VENOUS REPAIR
     params.orderStartDateTime = "Sep 17,2015@09:30";
     params.urgencyCode = "9";
     params.modeCode = "A";
     params.classCode = "O";
     params.submitTo = "14";
     params.pregnant = "false";
     params.isolation = "false";
     params.preOpDateTime = "Sep 17,2015@08:30";
     params.reasonForStudy = "Testing order writing via ewd web services";
     params.clinicHx = "This is some history|separated with a pipe|the same way |MDWS takes it!";
     //params.modifiers = "mod 1|mod 2" - TBD: any order types in dev environment have modifiers??
     params.orderCheckOverrideReason = "Because I'm testing!!";
     */
    createNewRadiologyOrder: {
        POST: function(ewd, session) {
            var params = {
                patientId: ewd.post_data.patientId,
                providerId: ewd.post_data.providerId,
                userId: ewd.post_data.userId,
                eSig: ewd.post_data.eSig,
                dialogId: ewd.post_data.dialogId,
                locationId: ewd.post_data.locationId,
                orderableItemId: ewd.post_data.orderableItemId,
                orderStartDateTime: ewd.post_data.orderStartDateTime,
                urgencyCode: ewd.post_data.urgencyCode,
                modeCode: ewd.post_data.modeCode,
                classCode: ewd.post_data.classCode,
                submitTo: ewd.post_data.submitTo,
                pregnant: ewd.post_data.pregnant,
                isolation: ewd.post_data.isolation,
                preOpDateTime: ewd.post_data.preOpDateTime,
                reasonForStudy: ewd.post_data.reasonForStudy,

                clinicHx: ewd.post_data.clinicHx, // separate lines with pipe character: '|'
                orderCheckOverrideReason: ewd.post_data.orderCheckOverrideReason,

                modifiers: ewd.post_data.modifiers // separate modifiers with pipe character: '|'
            };

            var ok = ewd.util.restoreSymbolTable(ewd, session);	//Flush symbol table and replace with ours
            var result = vista.saveNewRadiologyOrder(params, session, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session);	//Grab our symbol table for use next time
            return result;
        }
    },

    getAllergiesDetailMap: {
        GET: function(ewd, session) {
            var params = {
                patientId: ewd.query.patientId
            };
            var ok = ewd.util.restoreSymbolTable(ewd, session);	//Flush symbol table and replace with ours
            var result = vista.getAllergies(params, session, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session);	//Grab our symbol table for use next time
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
            var ok = ewd.util.restoreSymbolTable(ewd, session);	//Flush symbol table and replace with ours
            var result = vista.getHospitalLocations(params, session, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session);	//Grab our symbol table for use next time
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
            var ok = ewd.util.restoreSymbolTable(ewd, session);	//Flush symbol table and replace with ours
            var result = vista.getChemHemReports(params, session, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session);	//Grab our symbol table for use next time
            return result;
        }
    },

    getImagingTypesMap: {
        GET: function(ewd, session) {
            var ok = ewd.util.restoreSymbolTable(ewd, session);	//Flush symbol table and replace with ours
            var result = vista.getImagingOrderTypes({}, session, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session);	//Grab our symbol table for use next time
            return result;
        }
    },

    getMedicationsDetailMap: {
        GET: function(ewd, session) {
            var ok = ewd.util.restoreSymbolTable(ewd, session);	//Flush symbol table and replace with ours
            var result = vista.getAllMeds({patientId: ewd.query.patientId}, session, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session);	//Grab our symbol table for use next time
            return result;
        }
    },

    getNotesDetailMap: {
        GET: function(ewd, session) {
            var params = {
                patientId: ewd.query.patientId,
                fromDate: "0",
                toDate: "0"
            };
            var ok = ewd.util.restoreSymbolTable(ewd, session);	//Flush symbol table and replace with ours
            var result = vista.getNotesWithText(params, session, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session);	//Grab our symbol table for use next time
            return result;
        }
    },

    getOrderableItems: {
        GET: function(ewd, session) {
            var ok = ewd.util.restoreSymbolTable(ewd, session);	//Flush symbol table and replace with ours
            var result = vista.getOrderableItems({ dialogId: ewd.query.dialogId }, session, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session);	//Grab our symbol table for use next time
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
            var ok = ewd.util.restoreSymbolTable(ewd, session);	//Flush symbol table and replace with ours
            var result = vista.getSurgicalPathologyReports(params, session, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session);	//Grab our symbol table for use next time
            return result;
        }
    },

    getPatientIDFromTrackingID: {
        GET: function(ewd, session) {
            var params = { ien: ewd.query.ien };
            //var ok = ewd.util.restoreSymbolTable(ewd, session);	//Flush symbol table and replace with ours
            var result = vista.getPatientIDFromTrackingID(params, session, ewd);
            //var ok = ewd.util.saveSymbolTable(ewd, session);	//Grab our symbol table for use next time
            return result;
        }
    },

    getPatientMap: {
        GET: function(ewd, session) {
            var ok = ewd.util.restoreSymbolTable(ewd, session);	//Flush symbol table and replace with ours
            var result = vista.getPatient({ patientId: ewd.query.patientId }, session, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session);	//Grab our symbol table for use next time
            return result;
        }
    },

    getProblemsListDetailMap: {
        GET: function(ewd, session) {
            var params = {
                patientId: ewd.query.patientId,
                type: ewd.query.type || ""
            };
            var ok = ewd.util.restoreSymbolTable(ewd, session);	//Flush symbol table and replace with ours
            var result = vista.getProblemList(params, session, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session);	//Grab our symbol table for use next time
            return result;
        }
    },

    getProviders: {
        GET: function(ewd, session) {
            var ok = ewd.util.restoreSymbolTable(ewd, session);	//Flush symbol table and replace with ours
            var result = vista.cprsUserLookup({ target: ewd.query.target }, session, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session);	//Grab our symbol table for use next time
            return result;
        }
    },

    getRadiologyCancellationReasons: {
        GET: function(ewd, session) {
            var ok = ewd.util.restoreSymbolTable(ewd, session);	//Flush symbol table and replace with ours
            var result = vista.getRadiologyOrderCancellationReasons({}, session, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session);	//Grab our symbol table for use next time
            return result;
        }
    },

    getRadiologyOrderChecks: {
        GET: function(ewd, session) {
            var params = {
                patientId: ewd.query.patientId,
                orderStartDateTime: ewd.query.orderStartDateTime, // expects format: Sep 10,2015@15:30
                locationId: ewd.query.locationId,
                orderableItemId: ewd.query.orderableItemId
            };
            var ok = ewd.util.restoreSymbolTable(ewd, session);	//Flush symbol table and replace with ours
            var result = vista.getRadiologyOrderChecksForAcceptOrderRequest(params, session, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session);	//Grab our symbol table for use next time
            return result;
        }
    },

    getRadiologyOrderDialog: {
        GET: function(ewd, session) {
            var params = {
                patientId: ewd.query.patientId,
                dialogId: ewd.query.dialogId
            };
            var ok = ewd.util.restoreSymbolTable(ewd, session);	//Flush symbol table and replace with ours
            var result = vista.getRadiologyOrderDialog(params, session, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session);	//Grab our symbol table for use next time
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
            var ok = ewd.util.restoreSymbolTable(ewd, session);	//Flush symbol table and replace with ours
            var result = vista.getRadiologyReports(params, session, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session);	//Grab our symbol table for use next time
            return result;
        }
    },

    getRawVitalSignsMap: {
        GET: function(ewd, session) {
            var params = {
                patientId: ewd.query.patientId
            };
            var ok = ewd.util.restoreSymbolTable(ewd, session);	//Flush symbol table and replace with ours
            var result = vista.getVitalSigns(params, session, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session);	//Grab our symbol table for use next time
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
            ok = ewd.util.saveSymbolTable(ewd, session);    //Grab our symbol table for use next time
            return result;
        }
    },

    getImmunizations: {
        GET: function(ewd, session) {
            var params = {
                patientId: ewd.query.patientId
            };
            var ok = ewd.util.restoreSymbolTable(ewd, session); //Flush symbol table and replace with ours

            params.rpcName = "ORQQPX IMMUN LIST";
            params.rpcArgs = [{type: "LITERAL", value: params.patientId}];
            var result = vista.runRpc(params, session, ewd);

            ok = ewd.util.saveSymbolTable(ewd, session);    //Grab our symbol table for use next time
            return result;
        }
    },

    getSurgeryReportsDetailMap: {
        GET: function(ewd, session) {
            var ok = ewd.util.restoreSymbolTable(ewd, session);	//Flush symbol table and replace with ours
            var result = vista.getSurgeryReportsWithText({ patientId: ewd.query.patientId }, session, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session);	//Grab our symbol table for use next time
            return result;
        }
    },

    getUserSecurityKeys: {
        GET: function(ewd, session) {
            var ok = ewd.util.restoreSymbolTable(ewd, session);	//Flush symbol table and replace with ours
            var result = vista.getUserSecurityKeys(ewd.query.uid || ewd.query.providerId, session, ewd); // accept uid or providerId as arg
            ok = ewd.util.saveSymbolTable(ewd, session);	//Grab our symbol table for use next time
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
            var ok = ewd.util.restoreSymbolTable(ewd, session);	//Flush symbol table and replace with ours
            var result = vista.getVisits(params, session, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session);	//Grab our symbol table for use next time
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
            ok = ewd.util.saveSymbolTable(ewd, session);        //Grab our symbol table for use next time
            return result;
        }
    },

    getOrderTypes: {
        GET: function(ewd, session) {
            var params = {};
            var ok = ewd.util.restoreSymbolTable(ewd, session); //Flush symbol table and replace with ours
            var result = ordersLib.getOrderTypes(params, session, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session);        //Grab our symbol table for use next time
            return result;
        }
    },

    getClinics: {
        GET: function(ewd, session) {
            var ok = ewd.util.restoreSymbolTable(ewd, session); //Flush symbol table and replace with ours
            var result = patientSearchLib.getClinics(session, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session);        //Grab our symbol table for use next time
            return result;
        }
    },

    getWards: {
        GET: function(ewd, session) {
            var ok = ewd.util.restoreSymbolTable(ewd, session); //Flush symbol table and replace with ours
            var result = patientSearchLib.getWards(session, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session);        //Grab our symbol table for use next time
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
            ok = ewd.util.saveSymbolTable(ewd, session);        //Grab our symbol table for use next time
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
            ok = ewd.util.saveSymbolTable(ewd, session);        //Grab our symbol table for use next time
            return result;
        }
    },

    getPatientHealthFactors: {
        GET: function(ewd, session) {
            var params = {
                patientId: ewd.query.patientId,
                fromDate: ewd.query.fromDate || "",
                toDate: ewd.query.toDate || ""
            };
            var ok = ewd.util.restoreSymbolTable(ewd, session); //Flush symbol table and replace with ours
            var result = healthFactorsLib.getPatientHealthFactors(params, session, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session);        //Grab our symbol table for use next time
            return result;
        }
    },

    resolveBPs: {
        GET: function(ewd, session) {
            var params = {
                patientId: ewd.query.patientId,
                text: ewd.query.text || ""
            };
            var ok = ewd.util.restoreSymbolTable(ewd, session); //Flush symbol table and replace with ours                                                            
            var result = tiuLib.resolveBoilerplates(params, session, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session);        //Grab our symbol table for use next time                                                             
            return result;
        }
    },

    signNote: {
        GET: function(ewd, session) {
            var params = {
                noteIEN: ewd.query.noteIEN,
                eSig: ewd.query.eSig
            };
            var ok = ewd.util.restoreSymbolTable(ewd, session);	//Flush symbol table and replace with ours
            var result = vista.signNote(params, session, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session);	//Grab our symbol table for use next time
            return result;
        }
    },

    validateEsig: {
        GET: function(ewd, session) {
            var ok = ewd.util.restoreSymbolTable(ewd, session);	//Flush symbol table and replace with ours
            var tf = vista.isValidESig({ eSig: ewd.query.eSig }, session, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session);	//Grab our symbol table for use next time
            return { result: tf };
        }
    },

    writeNote: {
        POST: function(ewd, session) {
            var params = {
                patientId: ewd.post_data.patientId,
                titleIEN: ewd.post_data.titleIEN,
                authorDUZ: ewd.post_data.authorDUZ,
                cosignerDUZ: ewd.post_data.cosignerDUZ,
                userId: ewd.post_data.userId,
                text: ewd.post_data.text,
                encounterString: ewd.post_data.encounterString
            };

            var ok = ewd.util.restoreSymbolTable(ewd, session);	//Flush symbol table and replace with ours
            var result = vista.writeNote(params, session, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session);	//Grab our symbol table for use next time
            return result;
        }
    },

    // there are several places that need this function - they were all just wrapping this in the PHP/MDWS implementation
    getNoteTitles: {
        GET: function(ewd, session) {
            var ok = ewd.util.restoreSymbolTable(ewd, session);	//Flush symbol table and replace with ours
            var result = vista.getNoteTitles({ target: ewd.query.target }, session, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session);	//Grab our symbol table for use next time
            return result;
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
            ok = ewd.util.saveSymbolTable(ewd, session);    //Grab our symbol table for use next time
            return result;
        }
    },

    patientSummary: {
        GET: function(ewd, session) {
            var ok = ewd.util.restoreSymbolTable(ewd, session); //Flush symbol table and replace with ours
            var result = vista.getPatientSummaryDetails(ewd.query.id, ewd);
            ok = ewd.util.saveSymbolTable(ewd, session);    //Grab our symbol table for use next time
            return result;
        }
    }
};

module.exports = {

    parse: function(ewd) {
        var resource = ewd.query.rest_path.split('/')[1];
        var session;
        if (resource === 'devtest') {
            //No authentication
            var method = ewd.query.rest_method;
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
        var method = ewd.query.rest_method;
        if (operations[resource] && operations[resource][method]) {
            return operations[resource][method](ewd, session);
        }
        else {
            return vista.errorResponse('Invalid Request', 401);
        }
    }

};