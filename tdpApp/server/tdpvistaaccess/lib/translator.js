"use strict";

var _ = require('lodash');
var moment = require('moment');
var timeUtility = require('./time-utility');

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
            //if (timeUtility.onTodayOrYesterday(vitalSet.dateTime)) {
                vitalSets.push(vitalSet);
            //}
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

var translateTime = function (m) {
    var result = m.format('HHmmss');
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
        if (vistATime.length > 3) {
            time += vistATime.substring(2, 4);
        } else if (vistATime.length > 2) {
            time += vistATime.substring(2, 3) + '0';
        } else {
            time += '00';
        }
        date += ' ' + time;
    }
    return date;
};

exports.vistANow = function () {
    var m = moment();
    return translateDate(m) + '.' + translateTime(m);
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
    if (result.length === 1 && ((result[0].name === "No immunizations found.") || ! result[0].id)) {
      return [];
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

exports.translateOrderType = function (rawData) {
    var result = {};
    if (rawData && rawData.value) {
        Object.keys(rawData.value).forEach(function (key) {
            var value = rawData.value[key];
            var ePieces = value.split('=');
            var tPieces = ePieces[1].split('^');
            result[ePieces[0]] = {
                id: tPieces[0],
                topName: tPieces[1],
                subName: tPieces[2]
            };
        });
    }
    return result;
};

var orderStatusMap = {
    "1": "Discontinued",
    "2": "Complete",
    "3": "Hold",
    "4": "Flagged",
    "5": "Pending",
    "6": "Active",
    "7": "Expired",
    "8": "Scheduled",
    "9": "Partial Results",
    "10": "Delayed",
    "11": "Unreleased",
    "12": "Discontinued/Edit",
    "13": "Cancelled",
    "14": "Lapsed",
    "15": "Renewed",
    "99": "No Status",
};

var orderSignStatusMap = {
    "0": "ON CHART w/written orders",
    "1": "ELECTRONIC",
    "2": "NOT SIGNED",
    "3": "NOT REQUIRED",
    "4": "ON CHART w/printed orders",
    "5": "NOT REQUIRED due to cancel/lapse",
    "6": "SERVICE CORRECTION to signed order",
    "7": "DIGITALLY SIGNED",
    "8": "ON PARENT order"
};

exports.translateOrdersList = function (rawData, rawTypes) {
    var types = exports.translateOrderType(rawTypes);
    var result = [];
    if (rawData && rawData.value && _.isObject(rawData.value)) {
        var lastIndex = 0;
        Object.keys(rawData.value).forEach(function (key) {
            var index = parseInt(key, 10);
            if (index > lastIndex) {
                lastIndex = index;
            }
        });
        var order = null;
        for (var index = 1; index <= lastIndex; ++index) {
            var line = rawData.value[index.toString()];
            var charAt0 = line.charAt(0);
            line = line.slice(1);
            if (charAt0 === '~') {
                if (order) {
                    result.push(order);
                }
                order = {};
                order.text = "";
                var pieces = line.split('^');
                order.id = pieces[0];
                var type = types[pieces[1]];
                if (type) {
                    order.type = type;
                }
                order.timestamp = exports.translateVistADateTime(pieces[2]);
                order.startDate = exports.translateVistADateTime(pieces[3]);
                if (pieces[4]) {
                    order.stopDate = exports.translateVistADateTime(pieces[4]);
                }
                var status = orderStatusMap[pieces[5]] || 'Unknown';
                order.status = status;
                order.sigStatus = orderSignStatusMap[pieces[6]] || "Invalid Signature Status: " + pieces[6];
                order.verifyingNurse = pieces[7];
                order.verifyingClerk = pieces[8];
                order.provider = {
                    uid: pieces[9],
                    name: pieces[10]
                };
                order.flag = (pieces[12] === '1');
                order.chartReviewer = pieces[14];
            } else if (charAt0 === 't') {
                if (order.text) {
                    order.text += '\n' + line;
                } else {
                    order.text = line;
                }
            } else {
                continue;
            }
        }
        if (order) {
            result.push(order);
        }
    }
    return result;
};

exports.translateMeds = function(meds, type) {
  var result = meds.reduce(function(r, med) {
    var medType = med.type;
    var medStatus = med.status;
    if ((type === 'iv') && (medType !== 'IV')) {
      return r;
    }
    if (medStatus !== 'ACTIVE') {
      return r;
    }
    if ((type === 'inpatient') && (medType !== 'UD')) {
      return r;
    }
    if ((type === 'outpatient') && ! med.isOutpatient) {
      return r;
    }
    if (med.startDate && med.startDate.length) {
      med.startDate = exports.translateVistADateTime(med.startDate);
    }
    if (med.stopDate && med.stopDate.length) {
      med.stopDate = exports.translateVistADateTime(med.stopDate);
    }
    r.push(med);
    return r;
  }, []);
  if (type === 'iv') {
    meds.sort(function(a, b) {
      if ((! b.startDate) || (! b.startDate.length)) {
        return -1;
      }
      if ((! a.startDate) || (! a.startDate.length)) {
        return 1;
      }
      var ma = moment(a, 'MMDDYYYHHdd');
      var mb = moment(a, 'MMDDYYYHHdd');
      return mb.diff(ma);
    });
  }
  return result;
};
