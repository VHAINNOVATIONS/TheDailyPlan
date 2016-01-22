"use strict";

var chai = require('chai');

var mud = require('../lib/time-utility');
var moment = require('moment');

var expect = chai.expect;

xdescribe('time utility tests', function () {
    it('onTodayOrYesterday', function () {
        var now = moment();
        var yesterday = '01/02/2016 10:30';
        var today = '01/03/2016 00:10';
        var theDayBefore1 = '01/01/2015 12:30';
        var theDayBefore2 = '12/31/2015 12:30';
        expect(mud.onTodayOrYesterday(yesterday)).to.equal(true);
        expect(mud.onTodayOrYesterday(today)).to.equal(true);
        expect(mud.onTodayOrYesterday(theDayBefore1)).to.equal(false);
        expect(mud.onTodayOrYesterday(theDayBefore2)).to.equal(false);
    });
});
