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
            verifyCode: 'CPRS4321$XX',
            location: 'Madison'
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

    var userSession;

    it('login', function (done) {
        testSession.login({
            accessCode: 'CPRS1234',
            verifyCode: 'CPRS4321$',
            location: 'Madison',
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
        }, function (err, userData) {
            if (err) {
                done(err);
            } else {
                expect(userData).to.exist();
                console.log("======USER DATA=======");
                console.log(JSON.stringify(userData, undefined, 4));
                userSession = {
                  _id: userData.authKey,
                  _port: userData.authPort
                }
                console.log("======================");
                done();
            }
        });
    });

    var patients;
    xit('search patients', function (done) {
        testSession.searchPatients(userSession, {
            prefix: 'eig'
        }, function (err, body) {
            if (err) {
                done(err);
            } else {
                expect(body).to.exist();
                expect(body.length).to.be.above(0);
                patients = body;
                console.log("====== Last NAME =======");
                console.log(JSON.stringify(body, undefined, 4));
                console.log("======================");
                done();
            }
        });
    });

    xit('search patients last 5', function (done) {
        testSession.searchPatients(userSession, {
            prefix: 'F0440'
        }, function (err, body) {
            if (err) {
                done(err);
            } else {
                expect(body).to.exist();
                expect(body.length).to.be.above(0);
                console.log("====== SESARCH LAST 5=======");
                console.log(JSON.stringify(body, undefined, 4));
                console.log("======================");
                done();
            }
        });
    });

    xit('search patients full ssn', function (done) {
        testSession.searchPatients(userSession, {
            prefix: '666000028'
        }, function (err, body) {
            if (err) {
                done(err);
            } else {
                expect(body).to.exist();
                expect(body.length).to.be.above(0);
                console.log("====== SESARCH FULL=======");
                console.log(JSON.stringify(body, undefined, 4));
                console.log("======================");
                done();
            }
        });
    });

    var clinics;
    xit('getClinics', function (done) {
        testSession.getClinics(userSession, {}, function (err, body) {
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
        testSession.getPatientsByClinic(userSession, {
            clinicId: clinicId,
            fromDate: '3150909',
            toDate: '3160707'
        }, function (err, body) {
            if (err) {
                done(err);
            } else {
                expect(body).to.exist();
                console.log(patients);
                done();
            }
        });
    });

    var wards;
    xit('getWards', function (done) {
        testSession.getWards(userSession, {}, function (err, body) {
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
        testSession.getPatientsByWard(userSession, {
            wardId: wardId
        }, function (err, body) {
            if (err) {
                done(err);
            } else {
                expect(body).to.exist();
                console.log(body);
                done();
            }
        });
    });

    xit('get patient demographics/flags', function (done) {
        var pid = 100845; //100846; //756; //724; //631; //100845; //100748; //100846;
        testSession.getDemographics(userSession, pid, {}, function (err, body) {
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
        var pid = 100846; //patients[37].id;
        testSession.getAllergies(userSession, pid, {}, function (err, body) {
            if (err) {
                done(err);
            } else {
                expect(body).to.exist();
                //expect(body.length).to.be.above(0);
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
        testSession.getVitalSigns(userSession, pid, {
            occurances: 2
        }, function (err, body) {
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

    xit('get patient iv meds', function (done) {
        var pid = 100846; // patients[2].id;
        testSession.getMedications(userSession, '100846', {type: 'iv'}, function (err, body) {
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

    xit('get patient inpatient meds', function (done) {
        var pid = 100841; // 100033  //patients[2].id;
        testSession.getMedications(userSession, '100846', {type: 'inpatient'}, function (err, body) {
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

    xit('get patient outpatient meds', function (done) {
        var pid = 100841; // 100033  //patients[2].id;
        testSession.getMedications(userSession, '100846', {type: 'outpatient'}, function (err, body) {
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

    xit('get patient visits', function (done) {
        var pid = 100613; //756; //100846; //756; //520; //patients[37].id;
        testSession.getVisits(userSession, pid, {
            numDaysPast: 0,
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
        testSession.getPostings(userSession, pid, {
            includeTypes: undefined
        //    includeTypes: [
        //        'FALL RISK',
        //        'CLINICAL WARNING'
        //    ]
        }, function (err, body) {
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
        testSession.getImmunizations(userSession, pid, {}, function (err, body) {
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

    xit('get procedures', function (done) {
        var pid = 100846; //100685;
        testSession.getOrders(userSession, pid, {}, function (err, body) {
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

    xit('get pending procedures', function (done) {
        var pid = 100846; //100685;
        testSession.getAllOrders(userSession, pid, {}, function (err, body) {
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

    xit('get diet, lab orders', function (done) {
        var pid = 100846; //100022;
        testSession.getOrders(userSession, pid, {}, function (err, result) {
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

    xit('get chem hem reports', function (done) {
        var pid = 756; //100022;
        testSession.getChemHemReports(userSession, pid, {
            occurances: 2,
            testNames: [
                'CHOLESTEROL', 'HDL', 'TRIGLYCERIDE', 'MAGNESIUM', 'POTASSIUM'
            ]
        }, function (err, result) {
            if (err) {
                done(err);
            } else {
                expect(result).to.exist();
                console.log("=== Chem Hem =============");
                console.log(JSON.stringify(result, undefined, 4));
                console.log(result.length);
                console.log("============================");
                done();
            }
        });
    });

    xit('get chem hem reports', function (done) {
        var pid = 100846
        testSession.getChemHemReports(userSession, pid, {
            toDate: '3160412',
            fromDate: '1501010',
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

    xit('get health factors', function (done) {
        var pid = 100846;
        testSession.getHealthFactors(userSession, pid, {
          //includeFactors: ['PRESSURE ULCER PROTOCOL INITIATED']
        }, function (err, result) {
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

    it('get system health factors', function (done) {
        testSession.getSystemHealthFactors(userSession, function (err, result) {
            if (err) {
                done(err);
            } else {
                expect(result).to.exist();
                console.log("=== System Health Factors =============");
                console.log(JSON.stringify(result, undefined, 4));
                console.log("================================");
                done();
            }
        });
    });

    xit('boiler plates', function(done) {
      var pid = 100846;
        testSession.getBoilerplates(userSession, pid, {
          text: '|PATIENT NAME|^|PATIENT AGE|^|PATIENT SEX|'
        }, function (err, result) {
            if (err) {
                done(err);
            } else {
                expect(result).to.exist();
                console.log("=== Resolved boilerplates =============");
                console.log(result);
                console.log("=======================================");
                done();
            }
        });
    });

    it('logout', function (done) {
        testSession.logout(userSession, done);
    });
});
