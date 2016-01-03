"use strict";

var fs = require('fs');
var path = require('path');
var chai = require('chai');
var dirtyChai = require('dirty-chai');

var adapter = require('../index');

chai.use(dirtyChai);
var expect = chai.expect;

describe('ewd session test', function () {
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

    it('login error', function (done) {
        testSession.login({
            accessCode: 'CPRS1234XX',
            verifyCode: 'CPRS4321$XX'
        }, function (err) {
            if (err) {
                console.log(err.toString());
                done();
            } else {
                expect(testSession.userData).to.exist();
                done(new Error('Unexpected success.'));
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

    xit('get patient demographics/flags', function (done) {
        var pid = 100748; //100846;
        testSession.getDemographics(pid, {}, function (err, body) {
            if (err) {
                done(err);
            } else {
                expect(body).to.exist();
                //expect(body.name).to.equal(patients[2].text);
                console.log("======DEMOGRAPHICS=======");
                console.log(JSON.stringify(body, undefined, 4));
                console.log("======================");
                done();
            }
        });
    });

    xit('get patient allergies', function (done) {
        var pid = patients[37].id;
        testSession.getAllergies(pid, {}, function (err, body) {
            if (err) {
                done(err);
            } else {
                expect(body).to.exist();
                expect(body.length).to.be.above(0);
                console.log("======ALLERGIES=======");
                console.log(JSON.stringify(body, undefined, 4));
                console.log("======================");
                done();
            }
        });
    });

    it('get patient vitals', function (done) {
        var pid = patients[37].id;
        console.log(patients[37]);
        testSession.getVitalSigns(pid, {}, function (err, body) {
            if (err) {
                done(err);
            } else {
                expect(body).to.exist();
                //expect(body.length).to.be.above(0);
                console.log("=== VITAL SIGNS ======");
                console.log(JSON.stringify(body, undefined, 4));
                console.log("======================");
                done();
            }
        });
    });

    xit('get patient meds', function (done) {
        var pid = patients[2].id;
        testSession.getMedications('100022', {}, function (err, body) {
            if (err) {
                done(err);
            } else {
                //console.log(JSON.stringify(body, undefined, 4));
                expect(body).to.exist();
                done();
            }
        });
    });

    xit('get patient meds', function (done) {
        var pid = patients[2].id;
        testSession.getMedications('100014', {}, function (err, body) {
            if (err) {
                done(err);
            } else {
                //console.log(JSON.stringify(body, undefined, 4));
                expect(body).to.exist();
                done();
            }
        });
    });

    xit('get patient problems', function (done) {
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

    xit('get patient visits', function (done) {
        var pid = patients[37].id;
        testSession.getVisits(pid, {
            numDaysPast: 2998,
            numDaysFuture: 10
        }, function (err, body) {
            if (err) {
                done(err);
            } else {
                expect(body).to.exist();
                //expect(body.length).to.be.above(0);
                //console.log("======= VISITS =======");
                //console.log(JSON.stringify(body, undefined, 4));
                //console.log("======================");
                done();
            }
        });
    });

    xit('get clinical warnings', function (done) {
        var pid = 711;
        testSession.getClinicalWarnings(pid, {}, function (err, body) {
            if (err) {
                done(err);
            } else {
                expect(body).to.exist();
                //expect(body.length).to.be.above(0);
                console.log("=== CLINICAL WARNINGS ======");
                console.log(JSON.stringify(body, undefined, 4));
                console.log("============================");
                done();
            }
        });
    });

    xit('get immunizations', function (done) {
        var pid = 711;
        testSession.getImmunizations(pid, {}, function (err, body) {
            if (err) {
                done(err);
            } else {
                expect(body).to.exist();
                //expect(body.length).to.be.above(0);
                console.log("=== Immunizations ======");
                console.log(JSON.stringify(body, undefined, 4));
                console.log("============================");
                done();
            }
        });
    });

    xit('get orders', function (done) {
        var pid = 100685;
        testSession.getAllOrders(pid, {}, function (err, body) {
            if (err) {
                done(err);
            } else {
                expect(body).to.exist();
                //expect(body.length).to.be.above(0);
                //console.log("=== Order Types ============");
                //console.log(testSession.orderTypes);
                //console.log('============================');
                console.log("=== All Orders =============");
                console.log(JSON.stringify(body, undefined, 4));
                console.log("============================");
                done();
            }
        });
    });

    xit('radiology reports', function (done) {
        var pid = patients[2].id;
        testSession.getRadiologyReports('197', {}, function (err, body) {
            if (err) {
                done(err);
            } else {
                console.log("======RADIOLOGY REPORTS=======");
                console.log(JSON.stringify(body, undefined, 4));
                console.log("==============================");
                expect(body).to.exist();
                done();
            }
        });
    });

    xit('get diet, lab orders', function (done) {
        var pid = 100022;
        testSession.getOrdersAsClassified(pid, {}, function (err, result) {
            if (err) {
                done(err);
            } else {
                expect(result).to.exist();
                console.log("=== All Orders =============");
                console.log(JSON.stringify(result, undefined, 4));
                console.log("============================");
                done();
            }
        });
    });

    xit('get surgical pathology reports', function (done) {
        var pid = 4; //100022;
        testSession.getSurgicalPathologyReports(pid, {}, function (err, result) {
            if (err) {
                done(err);
            } else {
                expect(result).to.exist();
                console.log("=== Pathology =============");
                console.log(JSON.stringify(result, undefined, 4));
                console.log("============================");
                done();
            }
        });
    });

    it('get checm hem reports', function (done) {
        var pid = 4; //100022;
        testSession.getChemHemReports(pid, {}, function (err, result) {
            if (err) {
                done(err);
            } else {
                expect(result).to.exist();
                console.log("=== Chem Hem =============");
                console.log(JSON.stringify(result, undefined, 4));
                console.log("============================");
                done();
            }
        });
    });

    it('logout', function (done) {
        testSession.logout(done);
    });
});
