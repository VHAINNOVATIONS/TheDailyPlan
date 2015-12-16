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
});
