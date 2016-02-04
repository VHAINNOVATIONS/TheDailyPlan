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

    xit('login error', function (done) {
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
            verifyCode: 'CPRS4321$',
            userKeys: [{
              client: 'admin',
              vista: 'XUPROG'
            }, {
              client: 'admin2',
              vista: 'NOTHAVE'
            }, {
              client: 'admin3',
              vista: 'RA VERIFY'
            }, {
              client: 'admin4',
              vista: 'TDPADMIN'
            }]
        }, function (err) {
            if (err) {
                done(err);
            } else {
                expect(testSession.userData).to.exist();
                console.log("======USER DATA=======");
                console.log(JSON.stringify(testSession.userData, undefined, 4));
                console.log("======================");
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

    var clinics;
    xit('getClinics', function (done) {
        testSession.getClinics({}, function (err, body) {
            if (err) {
                done(err);
            } else {
                expect(body).to.exist();
                clinics = body;
                console.log(clinics);
                done();
            }
        });
    });

    xit('getPatientsByClinic', function (done) {
        var clinicId = clinics[0].id;
        testSession.getPatientsByClinic({
            clinicId: clinicId,
            fromDate: '3150909',
            toDate: '3160707'
        }, function (err, body) {
            if (err) {
                done(err);
            } else {
                expect(body).to.exist();
                patients = body;
                console.log(patients);
                done();
            }
        });
    });

    var wards;
    xit('getWards', function (done) {
        testSession.getWards({}, function (err, body) {
            if (err) {
                done(err);
            } else {
                expect(body).to.exist();
                wards = body;
                console.log(wards);
                done();
            }
        });
    });

    xit('getPatientsByWard', function (done) {
        var wardId = wards[2].id;
        testSession.getPatientsByWard({
            wardId: wardId
        }, function (err, body) {
            if (err) {
                done(err);
            } else {
                expect(body).to.exist();
                patients = body;
                console.log(patients);
                done();
            }
        });
    });

    it('get patient demographics/flags', function (done) {
        var pid = 100846; //756; //724; //631; //100845; //100748; //100846;
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

    xit('get patient vitals', function (done) {
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
        var pid = 100846; // patients[2].id;
        testSession.getMedications('100846', {type: 'iv'}, function (err, body) {
            if (err) {
                done(err);
            } else {
                console.log('======== MED 1IV =========');
                console.log(body.map(function(e) {return e.type}));

                console.log(JSON.stringify(body, undefined, 4));
                console.log('========================');
                expect(body).to.exist();
                done();
            }
        });
    });

    xit('get patient meds', function (done) {
        var pid = 100846; // 100033  //patients[2].id;
        testSession.getMedications('100846', {type: 'active'}, function (err, body) {
            if (err) {
                done(err);
            } else {
                console.log('======== MED ACTIVE =========');
                console.log(JSON.stringify(body, undefined, 4));
                console.log('========================');
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
        var pid = 756; //520; //patients[37].id;
        testSession.getVisits(pid, {
            numDaysPast: 2998,
            numDaysFuture: 30
        }, function (err, body) {
            if (err) {
                done(err);
            } else {
                expect(body).to.exist();
                expect(body.length).to.be.above(0);
                console.log("======= VISITS =======");
                console.log(JSON.stringify(body, undefined, 4));
                console.log("======================");
                done();
            }
        });
    });

    xit('get postings', function (done) {
        var pid = 100846; //40; //100848; //100846;
        testSession.getPostings(pid, {}, function (err, body) {
            if (err) {
                done(err);
            } else {
                expect(body).to.exist();
                //expect(body.length).to.be.above(0);
                console.log("====== POSTINGS ============");
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
        var pid = 296; //patients[2].id;
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
        var pid = 296; //100846; //100022;
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
        var pid = 100022;
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

    it('get chem hem reports', function (done) {
        var pid = 756; //100022;
        testSession.getChemHemReports(pid, {
            toDate: '3161010',
            fromDate: '1501010',
            testNames: [
                'MAGNESIUM', 'POTASSIUM'
            ]
        }, function (err, result) {
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

    it('get health factors', function (done) {
        var pid = 756;
        testSession.getHealthFactors(pid, {}, function (err, result) {
            if (err) {
                done(err);
            } else {
                expect(result).to.exist();
                console.log("=== Health Factors =============");
                console.log(JSON.stringify(result, undefined, 4));
                console.log("================================");
                done();
            }
        });
    });

    it('logout', function (done) {
        testSession.logout(done);
    });
});
