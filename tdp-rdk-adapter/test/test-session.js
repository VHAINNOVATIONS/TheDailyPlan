"use strict";

var fs = require('fs');
var path = require('path');
var chai = require('chai');
var dirtyChai = require('dirty-chai');

var adapter = require('../index');

chai.use(dirtyChai);
var expect = chai.expect;

describe('session test', function () {
    var generatedDir = null;

    var writeDebugFile = function (filename, content) {

        var filepath = path.join(generatedDir, filename);
        if (filename.split('.')[1] === 'json') {
            content = JSON.stringify(content, undefined, 4);
        }
        fs.writeFileSync(filepath, content);
    };

    before(function () {
        generatedDir = path.join(__dirname, "generated");
        try {
            fs.mkdirSync(generatedDir);
        } catch (e) {
            if (e.code !== 'EEXIST') {
                throw e;
            }
        }
        expect(generatedDir).not.to.equal(null);
    });

    var testSession;
    it('new session', function (done) {
        adapter.newSession(function (err, session) {
            if (err) {
                done(err);
            } else {
                expect(session.resourceDirectory).to.exist();
                expect(session.facilityMonikers).to.exist();
                expect(session.facilityList).to.exist();

                writeDebugFile('resourceDirectory.json', session.resourceDirectory);
                writeDebugFile('facilityMonikers.json', session.facilityMonikers);
                writeDebugFile('facilityList.json', session.facilityList);

                testSession = session;
                done();
            }
        });
    });

    it('login', function (done) {
        testSession.login({
            accessCode: 'pu1234',
            verifyCode: 'pu1234!!',
            site: '9E7A'
        }, function (err) {
            if (err) {
                done(err);
            } else {
                expect(testSession.userData).to.exist();
                done();
            }
        });
    });

    var patients;
    it('search patients', function (done) {
        testSession.resource('patient-search-full-name', {
            'name.full': 'eig'
        }, function (err, body) {
            if (err) {
                done(err);
            } else {
                expect(body.data && body.data.items).to.exist();
                expect(body.data.items.length).to.be.above(0);
                patients = body.data.items;
                done();
            }
        });
    });

    it('authorize patient', function (done) {  // if status is not 200 then further authorization is necessary
        testSession.resourceDirectory['authorize-authorize'].parameters = {
            get: {
                pid: {
                    required: true
                }
            }
        };
        var pid = patients[1].icn || patients[1].pid;
        testSession.resource('authorize-authorize', {
            'pid': pid
        }, function (err, body) {
            if (err) {
                done(err);
            } else {
                done();
            }
        });
    });

    it('logout', function (done) {
        testSession.logout(done);
    });
});
