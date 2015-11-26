"use strict";

var fs = require('fs');
var path = require('path');
var chai = require('chai');
var dirtyChai = require('dirty-chai');

var adapter = require('../index');

chai.use(dirtyChai);
var expect = chai.expect;

describe('ewd session test', function () {
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
                testSession = session;
                done();
            }
        });
    });

    it('login', function (done) {
        testSession.login({
            accessCode: 'CPRS1234',
            verifyCode: 'CPRS4321$'
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
        testSession.searchPatients({
            prefix: 'eig'
        }, function (err, body) {
            if (err) {
                done(err);
            } else {
                expect(body).to.exist();
                expect(body.length).to.be.above(0);
                patients = body;
                done();
            }
        });
    });

    it('get patient demographics/flags', function (done) {
        var pid = patients[2].id;
        testSession.getDemographics(pid, {}, function (err, body) {
            if (err) {
                done(err);
            } else {
                expect(body).to.exist();
                expect(body.name).to.equal(patients[2].text);
                done();
            }
        });
    });

    it('get patient allergies', function (done) {
        var pid = patients[37].id;
        testSession.getAllergies(pid, {}, function (err, body) {
            if (err) {
                done(err);
            } else {
                expect(body).to.exist();
                expect(body.length).to.be.above(0);
                done();
            }
        });
    });

    it('get patient meds', function (done) {
        var pid = patients[2].id;
        testSession.getMedications(pid, {}, function (err, body) {
            if (err) {
                done(err);
            } else {
                console.log(JSON.stringify(body, undefined, 4));
                expect(body).to.exist();
                done();
            }
        });
    });

    it('get patient problems', function (done) {
        var pid = patients[37].id;
        testSession.getProblems(pid, {}, function (err, body) {
            if (err) {
                done(err);
            } else {
                console.log(JSON.stringify(body, undefined, 4));
                expect(body).to.exist();
                done();
            }
        });
    });

    it('logout', function (done) {
        testSession.logout(done);
    });
});
