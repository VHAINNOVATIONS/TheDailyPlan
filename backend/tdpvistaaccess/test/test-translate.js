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
        //console.log(t0);
        var t1 = translator.translateVistADateTime("3150120.09");
        //console.log(t1);
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
        console.log(JSON.stringify(result, undefined, 4));
    });
});
