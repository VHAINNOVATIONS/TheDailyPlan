"use strict";

var _ = require('lodash');

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
