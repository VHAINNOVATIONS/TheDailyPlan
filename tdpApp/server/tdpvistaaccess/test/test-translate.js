"use strict";

var fs = require('fs');
var path = require('path');
var chai = require('chai');
var dirtyChai = require('dirty-chai');

var translator = require('../lib/translator');

chai.use(dirtyChai);
var expect = chai.expect;

describe('vista raw translations', function () {
    it('vitals', function () {
        var sample = require('./fixtures/rawVitalSignSample.json');
        var result = translator.translateVitalSigns(sample);
        //console.log(JSON.stringify(result, undefined, 4));
    });

    it('days past', function () {
        var p0 = translator.translateNumDaysPast(0);
        //console.log(p0);
        var p1 = translator.translateNumDaysPast(5);
        //console.log(p1);
        var p2 = translator.translateNumDaysPast(46);
        //console.log(p1);
    });

    it('days future', function () {
        var f0 = translator.translateNumDaysFuture(0);
        //console.log(f0);
        var f1 = translator.translateNumDaysFuture(47);
        //console.log(f1);
    });

    it('vistA time', function () {
        var t0 = translator.translateVistADateTime("3080714.08");
        expect(t0).to.equal('07/14/2008 08:00');
        var t1 = translator.translateVistADateTime("3150120.09");
        expect(t1).to.equal('01/20/2015 09:00');
        var t2 = translator.translateVistADateTime("3150221.093");
        expect(t2).to.equal('02/21/2015 09:30');
    });

    it('vistA now', function () {
        var t = translator.vistANow();
        //console.log(t);
    });

    it('visits', function () {
        var sample = require('./fixtures/rawVisitsSample.json');
        var result = translator.translateVisits(sample);
        //console.log(JSON.stringify(result, undefined, 4));
    });

    it('immunizations', function () {
        var sample = require('./fixtures/rawImmunizations.json');
        var result = translator.translateImmunizations(sample);
        //console.log(JSON.stringify(result, undefined, 4));
    });

    it('radiology reports', function () {
        var sample = require('./fixtures/rawRadiologyReportSample.json');
        var result = translator.translateRadiologyReports(sample);
        //console.log(JSON.stringify(result, undefined, 4));
    });

    it('problem list', function () {
        var sample = require('./fixtures/rawProblemListSample.json');
        var result = translator.translateProblemList(sample);
        //console.log(JSON.stringify(result, undefined, 4));
    });

    xit('orders', function () {
        var ordersSample = require('./fixtures/rawOrdersSample.json');
        var orderTypes = require('./fixtures/rawOrderTypes.json');
        var result = translator.translateOrdersList(ordersSample, orderTypes);
        //console.log(JSON.stringify(result, undefined, 4));
    });

    it('orders 2', function () {
        var ordersSample = require('./fixtures/rawOrdersSample2.json');
        var orderTypes = require('./fixtures/rawOrderTypes.json');
        var result = translator.translateOrdersList(ordersSample, orderTypes);
        expect(result.length).to.equal(8);
    });
});
