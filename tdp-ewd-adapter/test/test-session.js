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
            'name.full': 'eig'
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
        testSession.getDemographics(pid, function (err, body) {
            if (err) {
                done(err);
            } else {
                expect(body).to.exist();
                expect(body.name).to.equal(patients[2].text);
                done();
            }
        });
    });

    xit('get patient facilities', function (done) {
        var pid = patients[37].icn || patients[37].pid;
        testSession.resource('patient-search-pid', { // patient location indformation that is synced.
            'pid': pid
        }, function (err, body) {
            if (err) {
                done(err);
            } else {
                expect(body).to.exist();
                expect(body.status).to.equal(200);
                done();
            }
        });
    });

    xit('get patient allergies', function (done) {
        var pid = patients[37].icn || patients[37].pid;
        testSession.resource('patient-record-allergy', {
            'pid': pid
        }, function (err, body) {
            if (err) {
                done(err);
            } else {
                expect(body).to.exist();
                expect(body.status).to.equal(200);
                done();
            }
        });
    });

    xit('get patient meds', function (done) {
        var pid = patients[37].icn || patients[37].pid;
        testSession.resource('patient-record-med', {
            'pid': pid
        }, function (err, body) {
            if (err) {
                done(err);
            } else {
                expect(body).to.exist();
                expect(body.status).to.equal(200);
                done();
            }
        });
    });

    xit('get patient problems', function (done) {
        var pid = patients[37].icn || patients[37].pid;
        testSession.resource('patient-record-problem', {
            'pid': pid
        }, function (err, body) {
            if (err) {
                done(err);
            } else {
                expect(body).to.exist();
                expect(body.status).to.equal(200);
                done();
            }
        });
    });

    xit('get patient orders', function (done) {
        var pid = patients[37].icn || patients[37].pid;
        testSession.resource('patient-record-order', {
            'pid': pid
        }, function (err, body) {
            if (err) {
                done(err);
            } else {
                expect(body).to.exist();
                expect(body.status).to.equal(200);
                done();
            }
        });
    });

    var unsyncedIndex = 4; // The next two check unsynced patients but the patient becomes synced aftwerwards.  So not repeatable.  Change index to a unsynced patient to repeat.
    xit('check status (negative)', function (done) {
        testSession.resourceDirectory['synchronization-status'].parameters = {
            get: {
                pid: {
                    require: true
                }
            }
        };
        var pid = patients[unsyncedIndex].icn || patients[unsyncedIndex].pid;
        testSession.resource('synchronization-status', {
            'pid': pid
        }, function (err, body) {
            if (err) {
                expect(body).to.exist();
                expect(body.status).to.equal(404);
                done();
            } else {
                done(new Error('Unexpected not error'));
            }
        });
    });

    xit('get patient demographics/flags after negative', function (done) {
        var pid = patients[unsyncedIndex].icn || patients[unsyncedIndex].pid;
        testSession.resource('patient-record-patient', {
            'pid': pid
        }, function (err, body) {
            if (err) {
                done(err);
            } else {
                expect(body).to.exist();
                expect(body.status).to.equal(200);
                done();
            }
        });
    });

    xit('logout', function (done) {
        testSession.logout(done);
    });
});
