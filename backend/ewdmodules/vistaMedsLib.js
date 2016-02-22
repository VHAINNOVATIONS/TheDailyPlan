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
        return meds;
    },
    toAllMeds: function(response, params, session, ewd) {
        var result = [];
        if (!response || !response.hasOwnProperty('value')) {
            return result;
        }

        var rawMeds = [];
        var currRaw = null;
        var i;
        for (i = 1; response.value.hasOwnProperty(i.toString()); i++) {
            var line = response.value[i.toString()];
            if (line.indexOf('~') === 0) {
                currRaw = {
                    medicationType: this.getTypeFromCode(line.split('^')[0].split('~')[1]), // init type to make these easier to use below 
                    rawLines: []
                };
                rawMeds.push(currRaw);
            }
            currRaw.rawLines.push(line);
        }

        for (i = 0; i < rawMeds.length; i++) {
            var current = rawMeds[i];
            if (current.medicationType.hasOwnProperty('isOutpatient')) {
                current = this.toOutpatientMed(current.rawLines);
                result.push(current);
            } else if (current.medicationType.hasOwnProperty('isIV')) {
                current = this.toIVMed(ewd, current.rawLines);
                result.push(current);
            } else if (current.medicationType.hasOwnProperty('isUnitDose')) {
                current = this.toUnitDoseMed(ewd, current.rawLines);
                result.push(current);
            } else if (current.medicationType.hasOwnProperty('isInForOut')) {
                current = this.toInpatientForOutpatientMed(ewd, current.rawLines);
                result.push(current);
            } else if (current.medicationType.hasOwnProperty('isNonVA')) {
                current = this.toNonVAMed(current.rawLines);
                result.push(current);
            }
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
    toOutpatientMed: function(rawMedObj) {
        var result = {};

        var line1Pieces = rawMedObj[0].split('^');

        result.type = line1Pieces[0].split('~')[1];
        result.name = line1Pieces[2];
        result.refills = line1Pieces[5];
        result.status = line1Pieces[9];
        result.lastFillDate = line1Pieces[10];
        result.daysSupply = line1Pieces[11];
        result.quantity = line1Pieces[12];
        result.isOutpatient = true;

        result.detail = rawMedObj[1] && rawMedObj[1].trim();
        result.sig = rawMedObj[2] && rawMedObj[2].split('\\ Sig:')[1].trim();

        return result;
    },
    toNonVAMed: function(rawMedObj) {
        var result = {};

        var line1Pieces = rawMedObj[0].split('^');

        result.type = line1Pieces[0].split('~')[1];
        result.name = line1Pieces[2];
        result.status = line1Pieces[9];
        result.isOutpatient = true;
        result.detail = rawMedObj[1] && rawMedObj[1].trim();
        result.sig = rawMedObj[2] && rawMedObj[2].substring(1).trim();
        return result;
    },
    replaceRoute: function(ewd, rawMedObj, result) {
        var found = 0;
        for (var i=0; i<rawMedObj.length; ++i) {
            var ndx = rawMedObj[i].indexOf('\\Give:');
            if (ndx === 0) {
                found = i+1;
                break;
            }
        }
        if (found) {
            result.route = rawMedObj[found] ? rawMedObj[found].trim() : null;
            result.schedule = rawMedObj[found+1] ? rawMedObj[found + 1].trim() : null;
            if (result.route) {
                result.route = ewd.mumps.function('ROUTENM^ZZTDP', result.route);
            }
        }
    },
    extractIVFields: function(ewd, rawMedObj, result) {
        var routeSchLine;
        result.infusion = rawMedObj[0].split('^')[3];
        result.additives = [];
        for (var i = 1; i < rawMedObj.length; ++i) {
            var line = rawMedObj[i];
            if (line.substring(0, 3) === '\\in') {
                result.solution = line.substring(3).trim();
                routeSchLine = rawMedObj[i+1];
                break;
            }
            var additive = line.substring(1);
            result.additives.push(additive);
        }
        if (routeSchLine) {
            if (result.infusion) {
                routeSchLine = routeSchLine.split(result.infusion)[0].trim();
            }
            var pieces = routeSchLine.split(' ');
            result.route = pieces[0].substring(1);
            if (pieces.length > 1) {
                result.schedule = pieces.slice(1).join(' ');
                if (result.schedule) {
                    result.schedule = this.expandSchedule(ewd, result.schedule);
                }
            }
            if (result.route) {
                result.route = ewd.mumps.function('ROUTENM^ZZTDP', result.route);
            }
        }
    },
    toIVMed: function(ewd, rawMedObj) {
        var result = {};

        var rawLine1 = rawMedObj[0].split('^');

        result.type = 'IV';
        result.name = rawLine1[2];
        result.dose = rawLine1[6];
        result.isIV = true;
        result.isInpatient = true;
        result.status = rawLine1[9];
        result.stopDate = rawLine1[4];
        result.startDate = rawLine1[15];

        this.extractIVFields(ewd, rawMedObj, result);
        result.detail = result.additives.join(', ');
        if (result.solution) {
            result.detail += ' in ' + result.solution;
        }
        result.sig = result.route ? result.route : '';
        result.sig += result.schedule ? ' ' + result.schedule : '';
        result.sig += result.infusion ? ' ' + result.infusion : '';
        result.sig = result.sig.trim();
        return result;
    },
    expandSchedule: function(ewd, schedule) {
        var result = schedule.split(' ').map(function(r) {
            if (r === 'PRN') {
                return 'AS NEEDED';
            } else {
                return ewd.mumps.function('SCHNM^ZZTDP', r);
            }
        });
        return result.join(' ');
    },
    addRouteAndSchedule: function(ewd, rawMedObj, result) {
        var found = 0;
        for (var i=0; i<rawMedObj.length; ++i) {
            var ndx = rawMedObj[i].indexOf('\\Give:');
            if (ndx === 0) {
                found = i+1;
                break;
            }
        }
        if (found) {
            result.route = rawMedObj[found] ? rawMedObj[found].trim() : null;
            result.schedule = rawMedObj[found+1] ? rawMedObj[found + 1].trim() : null;
            if (result.route) {
                result.route = ewd.mumps.function('ROUTENM^ZZTDP', result.route);
            }
            if (result.schedule) {
                result.schedule = this.expandSchedule(ewd, result.schedule);
            }
        }
    },
    toUnitDoseMed: function(ewd, rawMedObj) {
        var result = {};

        var rawLine1 = rawMedObj[0].split('^');
        result.type = 'UD';
        result.isUnitDose = true;
        result.isInpatient = true;
        result.status = rawLine1[9];
        result.name = rawLine1[2];
        result.dose = rawLine1[6];
        result.startDate = rawLine1[15];
        result.stopDate = rawLine1[4];
        this.addRouteAndSchedule(ewd, rawMedObj, result);

        var detail = [result.name];
        if (result.dose) {
            detail.push(result.dose);
        }
        var sig = [];
        if (result.route) {
            sig.push(result.route);
        }
        if (result.schedule) {
            sig.push(result.schedule);
        }
        result.detail = detail.join(' ');
        result.sig = sig.join(' ');
        return result;
    },
    toInpatientForOutpatientMed: function(ewd, rawMedObj) {
        var result = {};

        var rawLine1 = rawMedObj[0].split('^');
        result.type = 'CP';
        result.isOutpatient = true;
        result.isImo = true;
        result.name = rawLine1[2];
        result.dose = rawLine1[6];
        result.startDate = rawLine1[15];
        result.stopDate = rawLine1[4];
        this.addRouteAndSchedule(ewd, rawMedObj, result);

        var detail = [result.name];
        if (result.dose) {
            detail.push(result.dose);
        }
        var sig = [];
        if (result.route) {
            sig.push(result.route);
        }
        if (result.schedule) {
            sig.push(result.schedule);
        }
        result.detail = detail.join(' ');
        result.sig = sig.join(' ');
        return result;
    }
};
