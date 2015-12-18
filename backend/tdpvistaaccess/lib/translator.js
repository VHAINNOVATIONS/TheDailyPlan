"use strict";

var _ = require('lodash');
var moment = require('moment');

var setVitalValue = function (key) {
    return function (vitalSet, data) {
        if (!vitalSet[key]) {
            vitalSet[key] = {};
        }
        vitalSet[key].value = data.split('^')[1];
    };
};

var propertyMap = {
    "TEMP": 'temperature',
    "PULSE": 'pulse',
    "RESP": 'respiration',
    "BP": 'bloodPressure',
    'HT': 'height',
    "WT": 'weight',
    "PAIN": null,
    "POx": 'pulseOxymetry',
    "CVP": 'centralVenousPressure',
    "C/G": 'circumferenceGirth'
};

var setVitalUnitOrQualifier = function (valueProperty) {
    return function (vitalSet, data) {
        Object.keys(data).forEach(function (lineKey) {
            var line = data[lineKey];
            line = line.split('^')[1];
            var linePieces = line.split(',');
            linePieces.forEach(function (linePiece) {
                var linePiecePieces = linePiece.split(':');
                if (linePiecePieces.length > 1) {
                    var property = propertyMap[linePiecePieces[0]];
                    var value = linePiecePieces[1].trim();
                    if (property && value) {
                        if (!vitalSet[property]) {
                            vitalSet[property] = {};
                        }
                        vitalSet[property][valueProperty] = value;
                    }
                }
            });
        });
    };
};

var setPulseOxymetryProperty = function (property) {
    return function (vitalSet, data) {
        if (!vitalSet.pulseOxymetry) {
            vitalSet.pulseOxymetry = {};
        }
        vitalSet.pulseOxymetry[property] = data.split('^')[1];
    };
};

var vitalSetUpdateFn = {
    '1': function (vitalSet, data) {
        var facilityData = data.split('^')[1];
        var facilityDataPieces = facilityData.split(';');
        vitalSet.facility = {
            name: facilityDataPieces[0],
            id: facilityDataPieces[1]
        };
    },
    '2': function (vitalSet, data) {
        vitalSet.dateTime = data.split('^')[1];
    },
    '3': setVitalValue('temperature'),
    '4': setVitalValue('pulse'),
    '5': setVitalValue('respiration'),
    '6': setVitalValue('bloodPressure'),
    '7': setVitalValue('height'),
    '8': setVitalValue('weight'),
    '9': setVitalValue('pain'),
    '10': setVitalValue('pulseOxymetry'),
    '11': setVitalValue('centralVenousPressure'),
    '12': setVitalValue('circumferenceGirth'),
    '13': setPulseOxymetryProperty('flowRate'),
    '14': setPulseOxymetryProperty('O2Concentrate'),
    '15': setVitalUnitOrQualifier('qualifier'),
    '16': setVitalValue('bodyMassIndex'),
    '17': setVitalUnitOrQualifier('unit')
};

exports.translateVitalSigns = function (rawVitalSets) {
    var vitalSets = [];
    rawVitalSets = _.get(rawVitalSets, "WP", null);
    if (rawVitalSets) {
        Object.keys(rawVitalSets).forEach(function (rawDate) {
            var vitalSet = {};
            var vitalSetData = rawVitalSets[rawDate];
            Object.keys(vitalSetData).forEach(function (key) {
                var data = vitalSetData[key];
                var fn = vitalSetUpdateFn[key];
                if (fn && data) {
                    fn(vitalSet, data);
                }
            });
            vitalSets.push(vitalSet);
        });
    }
    return vitalSets;
};

var translateDate = function (m) {
    var year = m.year();
    var vistaYear = year - 1700;
    var result = vistaYear + m.format('MMDD');
    return result;
};

exports.translateNumDaysPast = function (numDays) {
    var m = moment();
    if (numDays) {
        m.subtract(numDays, 'd');
    }
    return translateDate(m);
};

exports.translateNumDaysFuture = function (numDays) {
    var m = moment();
    if (numDays) {
        m.add(numDays, 'd');
    }
    return translateDate(m);
};

exports.translateVistADateTime = function (dateTime) {
    var dateTimePieces = dateTime.split('.');
    var vistADate = dateTimePieces[0];
    var year = parseInt(vistADate.substring(0, 3), 10) + 1700;
    var date = vistADate.substring(3, 5) + '/' + vistADate.substring(5, 7) + '/' + year;
    var vistATime = dateTimePieces[1];
    if (vistATime) {
        var time = vistATime.substring(0, 2) + ':';
        if (vistATime.length > 2) {
            time += vistATime.substring(2, 4);
        } else {
            time += '00';
        }
        date += ' ' + time;
    }
    return date;
};

exports.translateVistADate = function (dateTime) {
    var result = exports.translateVistADateTime(dateTime);
    return result.split(' ')[0];
};

exports.translateVisits = function (rawData) {
    var result = [];
    if (rawData && rawData.value) {
        Object.keys(rawData.value).forEach(function (key) {
            var apptPieces = rawData.value[key].split('^');
            var appt = {
                id: apptPieces[0],
                time: exports.translateVistADateTime(apptPieces[1]),
                title: apptPieces[2]
            };
            if (apptPieces[3]) {
                appt.status = apptPieces[3];
            }
            result.push(appt);
        });
    }
    return result;
};

exports.translateImmunizations = function (rawData) {
    var result = [];
    if (rawData && rawData.value) {
        Object.keys(rawData.value).forEach(function (key) {
            var immunizationPieces = rawData.value[key].split('^');
            var immunization = {
                id: immunizationPieces[0],
                date: exports.translateVistADate(immunizationPieces[2]),
                name: immunizationPieces[1]
            };
            if (immunizationPieces[3]) {
                immunization.status = immunizationPieces[3];
            }
            result.push(immunization);
        });
    }
    return result;
};

var setReportValue = function (key) {
    return function (report, data) {
        var value = data.split('^')[1];
        if (value) {
            report[key] = value;
        }
    };
};

var radiologyReportUpdateFn = {
    '1': function (report, data) {
        var facilityData = data.split('^')[1];
        var facilityDataPieces = facilityData.split(';');
        report.facility = {
            name: facilityDataPieces[0],
            id: facilityDataPieces[1]
        };
    },
    '2': setReportValue('dateTime'),
    '3': setReportValue('title'),
    '4': setReportValue('status'),
    '5': setReportValue('caseNumber'),
};

exports.translateRadiologyReports = function (rawData) {
    var result = [];
    if (rawData) {
        Object.keys(rawData).forEach(function (key) {
            var rawReport = rawData[key].WP;
            if (rawReport) {
                var report = {};
                Object.keys(rawReport).forEach(function (lineKey) {
                    var fn = radiologyReportUpdateFn[lineKey];
                    if (fn) {
                        fn(report, rawReport[lineKey]);
                    }
                });
                result.push(report);
            }
        });
    }
    return result;
};
