'use strict';

var vistaLib = require('VistALib');

module.exports = {
    getAllMeds: function(params, session, ewd) {
        params.rpcName = 'ORWPS ACTIVE';
        params.rpcArgs = [{
            type: 'LITERAL',
            value: params.patientId
        }];
        var response = vistaLib.runRpc(params, session, ewd);

        var meds = this.toAllMeds(response, params, session, ewd);
        var otherMeds = this.getOtherMedsFromReportsTab(params, session, ewd);

        var combined = meds.concat(otherMeds);
        return combined;
    },

    toAllMeds: function(response, params, session, ewd) {
        var result = [];
        if (!response || !response.hasOwnProperty('value')) {
            return result;
        }

        var opSupplements = null;
        var udSupplements = null;

        // ORWPS ACTIVE response example:
        //{
        //	'type':'ARRAY',
        //	'value':
        //	{
        //		'1':'~NV^1N;O^FEXOFENADINE HCL 6MG/ML ORAL SUSP^^^^^^33838^ACTIVE',
        //		'2':' FEXOFENADINE HCL 6MG/ML ORAL SUSP',
        //		'3':'\\ 1 TEASPOONFUL (5ML) MOUTH EVERY DAY',
        //		'4':'~NV^2N;O^VITAMIN B COMP W/C & FOLIC (DEXFOL) TAB^^^^^^33839^ACTIVE',
        //		'5':' VITAMIN B COMP W/C & FOLIC (DEXFOL) TAB',
        //		'6':'\\ 1 TAB MOUTH EVERY DAY',
        //		'7':'~NV^3N;O^SIMVASTATIN 20MG TAB^^^^^^33842^ACTIVE',
        //		'8':' SIMVASTATIN 20MG TAB',
        //		'9':'\\ 20MG MOUTH TWICE A DAY'
        //	}
        //}	

        // this setup walks through array and creates some objects for working with meds
        // it's needed because med results may have different numbers of lines for different types so we key off tilde
        var rawMeds = [];
        var currRaw = null;
        var i;
        for (i = 1; response.value.hasOwnProperty(i.toString()); i++) {
            if (response.value[i.toString()].indexOf('~') === 0) {
                if (currRaw === null) {
                    currRaw = {
                        medicationType: this.getTypeFromCode(response.value[i.toString()].split('^')[0].split('~')[1]), // init type to make these easier to use below 
                        rawLines: []
                    };
                } else {
                    rawMeds.push(currRaw);
                    currRaw = null;
                    i--; // decrement this one so next pass through will catch current line!
                    continue;
                }
            }
            currRaw.rawLines.push(response.value[i.toString()]);
        }

        // push last med on to array
        if (currRaw !== null) {
            rawMeds.push(currRaw);
        }
        // done setup! 

        // now loop through prepared array and supplement
        for (i = 0; i < rawMeds.length; i++) {
            var current = rawMeds[i];
            // build med results, supplement if appropriate, lazy load supplemental results
            if (current.medicationType.hasOwnProperty('isOutpatient')) {
                if (opSupplements === null) {
                    opSupplements = this.getOutpatientMedsFromReportsTab(params, session, ewd);
                }
                current = this.toOutpatientMed(current.rawLines, opSupplements);
                result.push(current);
            } else if (current.medicationType.hasOwnProperty('isIV')) {
                current = this.toIVMed(current.rawLines);
                result.push(current);
            } else if (current.medicationType.hasOwnProperty('isUnitDose')) {
                if (udSupplements === null) {
                    udSupplements = this.getUnitDoseMedsFromReportsTab(params, session, ewd);
                }
                current = this.toUnitDoseMed(current.rawLines, udSupplements);
                result.push(current);
            } else if (current.medicationType.hasOwnProperty('isInForOut')) {
                current = this.toInpatientForOutpatientMed(current.rawLines);
                result.push(current);
            }
            // note: purposefully not adding result to array for other types!
        }

        return result;
    },

    // don't use this function - only for encapsulating the type determination when supplementing meds
    getTypeFromCode: function(code) {
        if (code == 'OP') {
            return {
                code: code,
                isOutpatient: true
            };
        } else if (code == 'IV') {
            return {
                code: code,
                isIV: true
            };
        } else if (code == 'NV') {
            return {
                code: code,
                isNonVA: true
            };
        } else if (code == 'UD') {
            return {
                code: code,
                isUnitDose: true
            };
        } else if (code == 'CP') {
            return {
                code: code,
                isInForOut: true
            };
        } else {
            return {
                code: code,
                type: 'unknown'
            };
        }
    },

    toOutpatientMed: function(rawMedObj, reportsTabObj) {
        var result = {};

        var line1Pieces = rawMedObj[0].split('^');

        result.type = line1Pieces[0].split('~')[1];
        result.id = line1Pieces[1];
        result.name = line1Pieces[2];
        result.refills = line1Pieces[5];
        result.orderId = line1Pieces[8];
        result.status = line1Pieces[9];
        result.lastFillDate = line1Pieces[10];
        result.daysSupply = line1Pieces[11];
        result.quantity = line1Pieces[12];
        result.isOutpatient = true;

        result.detail = rawMedObj[1];
        result.sig = rawMedObj[2];

        var numericResultId = result.id.replace(/\D/g, ''); //remove all non-numeric chars
        if (reportsTabObj !== null && reportsTabObj.hasOwnProperty(numericResultId)) {
            result.rxNumber = reportsTabObj[numericResultId].rxNumber;
            result.drug = reportsTabObj[numericResultId].drug;
            result.cost = reportsTabObj[numericResultId].cost;
            result.stopDate = reportsTabObj[numericResultId].stopDate;
            result.expirationDate = reportsTabObj[numericResultId].expirationDate;
            result.issueDate = reportsTabObj[numericResultId].issueDate;
            result.provider = reportsTabObj[numericResultId].provider;
            result.sig = reportsTabObj[numericResultId].sig;
            result.isSupply = reportsTabObj[numericResultId].isSupply;
        }

        return result;
    },

    // not even remotely close to being tested!! we don't have any IV meds in
    // our test VistA and creating new med orders seems to generate errors
    // in VistA so can't stage data... for now, just doing best job possible 
    // translating from MDWS to JS
    toIVMed: function(rawMedObj) {
        var result = {};

        var rawLine1 = rawMedObj[0].split('^');

        result.type = 'IV';
        result.id = rawLine1[1];
        result.name = rawLine1[2];
        result.orderId = rawLine1[8];
        // set facility to connection site? seems like we can probably skip this...
        result.route = 'INTRAVENOUS';
        result.dose = rawLine1[6];
        result.isIV = true;
        result.isInpatient = true;
        result.status = rawLine1[9];
        result.stopDate = rawLine1[4];
        result.startDate = rawLine1[15];

        result.detail = '';
        var i;
        for (i = 1; i < rawMedObj.length; i++) {
            result.detail += (rawMedObj[i] + '\r\n');
        }

        var textFields = result.detail.split('\r\n');

        if (textFields.length > 0) {
            if (result.dose === '' && textFields[0].length > 0) {
                var firstIndexOfNumber = 0;
                for (i = 0; i < textFields[0].length; i++) {
                    var currentChar = textFields[0][i];
                    if ('0' <= currentChar && currentChar <= '9') {
                        firstIndexOfNumber = i;
                        break;
                    }
                }
                if (firstIndexOfNumber > 0) {
                    result.dose = textFields[0].substr(firstIndexOfNumber);
                    result.additives = textFields[0].substr(0, firstIndexOfNumber);
                }
            }

            for (var line in textFields) {
                if (line.indexOf('\\in') > 0) {
                    result.solution = line.replace('\\in', '');
                } else if (line.indexOf('\\IV') > 0) {
                    result.schedule = line.replace('\\IV', '');
                }
            }
        }

        return result;
    },

    // TODO: same as toIVMed - needs thorough testing!!!!!
    toUnitDoseMed: function(rawMedObj, reportsTabObj) {
        var result = {};

        var rawLine1 = rawMedObj[0].split('^');
        result.type = 'UD';
        result.id = rawLine1[1];
        // facility being set cxn site ID - can probably skip
        result.orderId = rawLine1[8];
        result.isUnitDose = true;
        result.isInpatient = true;
        result.status = rawLine1[9];

        result.drug = {
            value: rawLine1[2]
        };
        result.name = rawLine1[2];
        result.dose = rawLine1[6];
        result.startDate = rawLine1[15];
        result.stopDate = rawLine1[4];

        result.detail = '';
        for (var i = 1; i < rawMedObj.length; i++) {
            result.detail += (rawMedObj[i] + '\r\n');
        }

        var textFields = result.detail.split('\r\n');

        var rptsTabMatch = null;
        for (var prop in reportsTabObj) {
            if (reportsTabObj.hasOwnProperty(prop)) {
                if ((result.drug.value === reportsTabObj[prop].drug.value) &&
                    (result.drug.startDate === reportsTabObj[prop].startDate) &&
                    (result.drug.stopDate === reportsTabObj[prop].stopDate) &&
                    (result.dose === reportsTabObj[prop].dose)) {

                    rptsTabMatch = reportsTabObj[prop];
                    break;
                }
            }
        }

        if (rptsTabMatch !== null) {
            result.drug = rptsTabMatch.drug;
            result.stopDate = rptsTabMatch.stopDate;
            result.startDate = rptsTabMatch.startDate;
            result.route = rptsTabMatch.route;
            result.dose = rptsTabMatch.dose;
            result.schedule = rptsTabMatch.schedule;
            result.status = rptsTabMatch.status;
        }

        return result;
    },

    toInpatientForOutpatientMed: function(rawMedObj, reportsTabObj) {
        var result = {};

        var rawLine1 = rawMedObj[0].split('^');
        result.type = 'CP';
        //result.rawLine1[1];
        // MDWS adding facility from connected site ID - prolly not needed
        result.orderId = rawLine1[8];
        result.isOutpatient = true;
        result.isImo = true;

        result.hospital = {
            key: rawLine1[0].split(':')[2],
            value: rawLine1[0].split(':')[2]
        };
        result.drug = {
            value: rawLine1[2]
        };
        result.name = rawLine1[2];
        result.dose = rawLine1[6];
        result.startDate = rawLine1[15];
        result.stopDate = rawLine1[4];

        result.detail = '';
        for (var i = 1; i < rawMedObj.length; i++) {
            result.detail += (rawMedObj[i] + '\r\n');
        }

        return result;
    },

    getOtherMedsFromReportsTab: function(params, session, ewd) {
        params.reportsTabName = 'OR_RXN:HERBAL/OTC/NON-VA MEDS~NVA;ORDV06A;0;';
        //return vistaLib.runReportsTabRpc(params, session, ewd);
        return this.toOtherMeds(vistaLib.runReportsTabRpc(params, session, ewd));
    },

    // returns simple array because other meds have no ID
    toOtherMeds: function(response) {
        var result = [];
        for (var propOut in response) {
            var responseIn = response[propOut];
            if (responseIn) {
                for (var prop in responseIn) {
                    if (responseIn.hasOwnProperty(prop) && responseIn[prop]['WP']) {
                        var raw = responseIn[prop]['WP'];
                        var current = {
                            type: 'NV',
                            isOutpatient: true,
                            isNonVa: true
                        };

                        var facilityStr = raw['1'].split('^')[1].split(';'); // e.g. MedObj['1'] : '1^CAMP MASTER;500'
                        current.facility = {
                            id: facilityStr[1],
                            name: facilityStr[0]
                        };

                        current.name = raw.hasOwnProperty('2') ? raw['2'].split('^')[1] : '';
                        current.status = raw.hasOwnProperty('3') ? raw['3'].split('^')[1] : '';
                        current.startDate = raw.hasOwnProperty('4') ? raw['4'].split('^')[1] : '';
                        current.dateDocumented = raw.hasOwnProperty('5') ? raw['5'].split('^')[1] : '';
                        current.documentor = {
                            name: (raw.hasOwnProperty('6') ? raw['6'].split('^')[1] : '')
                        };
                        current.stopDate = raw.hasOwnProperty('7') ? raw['7'].split('^')[1] : '';
                        current.sig = raw.hasOwnProperty('8') ? raw['8'].split('^')[1] : '';
                        if (raw.hasOwnProperty('10') && raw['10'].hasOwnProperty('1')) {
                            current.comment = '';
                            var currentLine = 1;
                            while (raw['10'].hasOwnProperty(currentLine.toString())) {
                                current.comment += (raw['10'][currentLine.toString()]).split('^')[1] + '\r\n';
                                currentLine++;
                            }
                            current.comment = current.comment.trim();
                        }

                        result.push(current);
                    }
                }
            }
        }
        return result;
    },

    getOutpatientMedsFromReportsTab: function(params, session, ewd) {
        params.reportsTabName = 'OR_RXOP:ALL OUTPATIENT~RXOP;ORDV06;28;';
        return this.toOutpatientMedsFromReportsTab(vistaLib.runReportsTabRpc(params, session, ewd));
    },

    toOutpatientMedsFromReportsTab: function(response) {
        var result = {}; // make a dictionary
        //return response;

        // next two lines are how one iterates over object properties in js
        for (var prop in response.result) {
            if (response.result.hasOwnProperty(prop)) {
                var raw = response.result[prop]['WP'];
                var current = {
                    type: 'OP',
                    isOutpatient: true
                }; // initialize these defaults

                var facilityStr = raw['1'].split('^')[1].split(';'); // e.g. MedObj['1'] : '1^CAMP MASTER;500'
                current.facility = {
                    id: facilityStr[1],
                    name: facilityStr[0]
                };

                current.name = raw.hasOwnProperty('2') ? raw['2'].split('^')[1] : ''; // e.g. MedObj['3'] : '3^MORPHINE ORAL 10MG/5ML CC '
                current.drug = {
                    id: raw['3'].split('^')[1],
                    name: current.name
                }; // e.g. MedObj['2'] : '2^123'
                current.rxNumber = raw.hasOwnProperty('4') ? raw['4'].split('^')[1] : ''; // e.g. etc...
                current.status = raw.hasOwnProperty('5') ? raw['5'].split('^')[1] : '';
                current.quantity = raw.hasOwnProperty('6') ? raw['6'].split('^')[1] : '';
                current.expirationDate = raw.hasOwnProperty('7') ? raw['7'].split('^')[1] : '';
                current.issueDate = raw.hasOwnProperty('8') ? raw['8'].split('^')[1] : '';
                current.lastFillDate = raw.hasOwnProperty('9') ? raw['9'].split('^')[1] : '';
                current.refills = raw.hasOwnProperty('10') ? raw['10'].split('^')[1] : '';
                current.provider = raw.hasOwnProperty('11') ? {
                    name: raw['11'].split('^')[1]
                } : {};
                current.cost = raw.hasOwnProperty('12') ? raw['12'].split('^')[1] : '';
                current.id = raw.hasOwnProperty('15') ? raw['15'].split('^')[1] : '';
                current.stopDate = raw.hasOwnProperty('16') ? raw['16'].split('^')[1] : '';

                // get sig lines from 14 - line numbers should be object properties
                if (raw.hasOwnProperty('14') && raw['14'].hasOwnProperty('1')) {
                    current.sig = '';
                    var currentLine = 1;
                    while (raw['14'].hasOwnProperty(currentLine.toString())) {
                        current.sig += (raw['14'][currentLine.toString()]).split('^')[1] + '\r\n';
                        currentLine++;
                    }
                    current.sig = current.sig.trim();
                }

                result[current.id] = current;
            }
        }

        return result;
    },

    getUnitDoseMedsFromReportsTab: function(params, session, ewd) {
        params.reportsTabName = 'OR_RXUD:UNIT DOSE~RXUD;ORDV06;29;';
        return this.toUnitDoseMedsFromReportsTab(vistaLib.runReportsTabRpc(params, session, ewd));
    },

    toUnitDoseMedsFromReportsTab: function(response) {
        var result = {}; // make a dictionary
        //return response;

        // next two lines are how one iterates over object properties in js
        for (var prop in response.result) {
            if (response.result.hasOwnProperty(prop)) {
                var raw = response.result[prop]['WP'];
                var current = {
                    type: 'UD',
                    isUnitDose: true,
                    isInpatient: true,
                    sig: ''
                }; // initialize these defaults

                var facilityStr = raw['1'].split('^')[1].split(';'); // e.g. MedObj['1'] : '1^CAMP MASTER;500'
                current.facility = {
                    id: facilityStr[1],
                    name: facilityStr[0]
                };

                current.id = raw.hasOwnProperty('2') ? raw['2'].split('^')[1] : ''; // e.g. MedObj['2'] : '2^123'
                current.name = raw.hasOwnProperty('3') ? raw['3'].split('^')[1] : ''; // e.g. MedObj['3'] : '3^MORPHINE ORAL 10MG/5ML CC '
                current.dose = raw.hasOwnProperty('4') ? raw['4'].split('^')[1] : ''; // e.g. etc...
                current.status = raw.hasOwnProperty('5') ? raw['5'].split('^')[1] : '';
                current.startDate = raw.hasOwnProperty('6') ? raw['6'].split('^')[1] : '';
                current.stopDate = raw.hasOwnProperty('7') ? raw['7'].split('^')[1] : '';
                current.route = raw.hasOwnProperty('8') ? raw['8'].split('^')[1] : '';
                current.schedule = raw.hasOwnProperty('9') ? raw['9'].split('^')[1] : '';

                current.drug = {
                    id: current.id,
                    name: current.name
                };

                result[current.id] = current;
            }
        }

        return result;
    }
};
