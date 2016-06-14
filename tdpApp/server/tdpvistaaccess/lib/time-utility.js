"use strict";

var moment = require('moment');

exports.nowIsBetween = function (externalStart, externalStop) {
    var now = moment();
    if (externalStart) {
        var start = moment(externalStart, "MM/DD/YYYY HH:mm");
        if (now.isBefore(start)) {
            return false;
        }
    }
    if (externalStop) {
        var stop = moment(externalStop, "MM/DD/YYYY HH:mm");
        if (now.isAfter(stop)) {
            return false;
        }
    }
    return true;
};

exports.onTodayOrYesterday = function (externalTimestamp) {
    var yesterday = moment().add(-1, 'days');
    var timestamp = moment(externalTimestamp, "MM/DD/YYYY HH:mm");
    return !timestamp.isBefore(yesterday, 'day');
};

exports.nowIsBefore = function(externalStop) {
    if (externalStop) {
        var now = moment();
        var stop = moment(externalStop, "MM/DD/YYYY HH:mm");
        if (now.isAfter(stop)) {
            return false;
        }
    }
    return true;
};

exports.existingIsBefore = function(newDateTime, existing) {
    if (newDateTime && existing) {
        var n = moment(newDateTime, "MM/DD/YYYY HH:mm");
        var e = moment(existing, "MM/DD/YYYY HH:mm");
        return n.isAfter(e);
    } else if (newDateTime) {
      return true;
    } else {
      return false;
    }
};

exports.startWithinFutureDays = function(externalStart, futureDays) {
    if (futureDays === undefined || futureDays === null) {
        futureDays = 30;
    }
    var mlimit = moment();
    if (futureDays) {
        mlimit.add(futureDays, 'd');
    }
    var start = moment(externalStart, "MM/DD/YYYY HH:mm");
    return ! start.isAfter(mlimit, 'day');
};

exports.postingsDate = function(input) {
    if (input) {
        var dateOnly = input.split('@')[0];
        return moment(dateOnly, 'MMM DD, YYYY').format('MM/DD/YYYY');
    }
    return '';
};

exports.dateAfterBackDays = function(externalDate, backDays) {
    if (backDays === undefined || backDays === null) {
        backDays = 30;
    }
    var mlimit = moment();
    if (backDays) {
        mlimit.subtract(backDays, 'd');
    }
    var date = moment(externalDate, "MM/DD/YYYY HH:mm");
    return date.isAfter(mlimit, 'day');
};
