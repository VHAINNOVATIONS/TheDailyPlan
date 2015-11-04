"use strict";

var chai = require('chai');

var adapter = require('../index');

var expect = chai.expect;

describe('flow test', function () {
    it('initialize', function () {
        adapter.initialize();
    });

    it('authenticate', function () {
        adapter.authenticate();
    });
});
