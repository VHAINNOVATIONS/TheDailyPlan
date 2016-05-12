"use strict";

var fs = require('fs');
var path = require('path');
var chai = require('chai');
var dirtyChai = require('dirty-chai');

var adapter = require('../index');
var pdf = require('../../pdf');

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

    it('report', function(done) {
        var options = {
            time: 'XXXX',
            date: 'YYYY'
        };
        pdf.write(testSession, userSession, ['100846'], [2], options, function(err) {
            if (err) {
                return done(err);
            }
            done();
        });
    });

    it('logout', function (done) {
        testSession.logout(userSession, done);
    });
});
