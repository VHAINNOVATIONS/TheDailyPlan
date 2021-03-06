'use strict';

var crypto = require('crypto');

var encryptCredentials = function(accessCode, verifyCode, key) {
    //Enhanced by SAN Businesss Consultants 20150929 for symetry with PHP
    var cleankey = '';
    for (var i = 0; i < key.length; i++) {
        if (key[i] != '-') {
            cleankey += key[i];
        }
    }
    var text = 'accessCode:' + accessCode + ';verifyCode:' + verifyCode;
    var iv1 = '1234567890123456';
    var algorithm1 = 'aes-256-cbc';

    var cipher1 = crypto.createCipheriv(algorithm1, cleankey, iv1);
    var crypted = cipher1.update(text, 'utf8', 'hex');
    crypted += cipher1.final('hex');
    var encrypted1 = iv1 + '_x_' + crypted;
    return encrypted1;
};

var decryptCredentials = function(encrypted, key) {
    //Enhanced by SAN Businesss Consultants 20150929 for symetry with PHP
    try {
        var cleankey = '';
        for (var i = 0; i < key.length; i++) {
            if (key[i] != '-') {
                cleankey += key[i];
            }
        }

        var algorithm1 = 'aes-256-cbc';
        var a1 = encrypted.split('_x_');
        var iv1 = a1[0];
        var encry1 = a1[1];

        var decipher = crypto.createDecipheriv(algorithm1, cleankey, iv1);
        var dec1 = decipher.update(encry1, 'hex', 'utf8');
        dec1 += decipher.final('utf8');

        var str = dec1.split('accessCode:')[1];
        var pieces = str.split(';verifyCode:');

        return {
            accessCode: pieces[0],
            verifyCode: pieces[1]
        };
    } catch (err) {
        return {
            error: 'Invalid credentials value'
        };
    }
};

var errorResponse = function(error, statusCode) {
    return {
        error: {
            text: error,
            statusCode: statusCode
        }
    };
};

var getGlobalNodeFromRef = function(globalRef, ewd) {
    // returns a GlobalNode instance from the TMP pointer returned by VistA RPCs
    var gloRef = globalRef.substr(1);
    var pieces = gloRef.split('(');
    var globalName = pieces[0];
    var subs = gloRef.substr(globalName.length);
    subs = '[' + subs.substr(1);
    subs = subs.slice(0, -1) + ']';
    var subscripts = JSON.parse(subs);
    return new ewd.mumps.GlobalNode(globalName, subscripts);
};

var vistALogin = function(accessCode, verifyCode, ewd) {
    var ok = ewd.mumps.function('LOGIN^ZZTDP', accessCode, verifyCode);
    if (ok === '') {
        var temp = new ewd.mumps.GlobalNode('TMP', [process.pid, 'TDP_LOGIN']);
        var results = temp._getDocument(0);
        temp._delete();
        if (results.username) {
            return {
                error: false,
                data: results
            };
        } else {
            return {
                error: 'Login failure due to cache.node bug - try again',
                pid: process.pid
            };
        }
    } else {
        return {
            error: ok
        };
    }
};

var convertFtoStringDate = function(x) {
    x = x.toString();
    x = x.slice(5, 7) + '/' + x.slice(3, 5) + '/' + (parseInt(x.slice(0, 3)) + 1700);
    return x;
};

module.exports = {

    errorResponse: errorResponse,

    // calling this global function from another file doesn't seem to work... trying this as a fix...
    getGlobalNodeFromRef: function(globalRef, ewd) {
        return getGlobalNodeFromRef(globalRef, ewd);
    },
    authenticate: function(ewd) {
        var statusCode = 401;
        var token = ewd.query['rest_auth'];
        if (!token) {
            // no token supplied
            return errorResponse('Failed authentication (1)', statusCode);
        } else if (token === '') {
            // token supplied was empty string
            return errorResponse('Failed authentication (2)', statusCode);
        } else {
            var session = ewd.util.getSession(token);
            if (session === '') {
                // token wasn't recognised or session timed out
                console.log('**** failed authentication - token = ' + token);
                var xsessid = ewd.util.getSessid(token);
                console.log('  sessid filed against this token: ' + xsessid);
                if (xsessid !== '') {
                    var xnode = {
                        global: ewd.map.global.session,
                        subscripts: ['session', xsessid, 'ewd_sessionExpiry']
                    };
                    var xexpiry = +ewd.db.get(xnode).data;
                    console.log('  expiry = ' + xexpiry);
                    console.log('  now = ' + Math.floor(new Date().getTime() / 1000));
                }
                console.log('***********');
                return errorResponse('Failed authentication (3)', statusCode);
            } else {
                ewd.util.updateSessionExpiry({
                    sessid: session.$('ewd_sessid')._value
                });
                return {
                    ok: true,
                    session: session
                };
            }
        }
    },

    loginStatus: function(session) {
        var statusCode = 401;
        if (session.$('VistA').$('DUZ')._value === '') {
            return errorResponse('Failed authentication (4)', statusCode);
        }
        if (session.$('cipherKey')._value !== '') {
            return errorResponse('Failed authentication (5)', statusCode);
        }
        return {
            ok: true
        };
    },

    initiate: function(appName, ewd) {
        var session = ewd.util.createNewSession(appName, 1200);
        //return session;
        var token = session.$('ewd_token')._value;
        var key = ewd.util.createToken();
        session.$('cipherKey')._value = key;
        return {
            Authorization: token,
            key: key
        };
    },
    vistALogin: vistALogin,
    login: function(ewd, session) {
        //return { ok: true };
        var sessid = session.$('ewd_sessid')._value;
        var errorStatusCode = 400;
        var key = session.$('cipherKey')._value;
        if (key === '') {
            ewd.util.deleteSession(sessid);
            return errorResponse('No key available', errorStatusCode);
        }
        var credentials = decryptCredentials(ewd.query.credentials, key);
        //console.log('credentials: ' + JSON.stringify(credentials));
        if (credentials.error) {
            ewd.util.deleteSession(sessid);
            return errorResponse(credentials.error, errorStatusCode);
        }
        if (!credentials.accessCode || credentials.accessCode === '') {
            ewd.util.deleteSession(sessid);
            return errorResponse('Missing Access Code', errorStatusCode);
        }
        if (!credentials.verifyCode || credentials.verifyCode === '') {
            ewd.util.deleteSession(sessid);
            return errorResponse('Missing Verify Code', errorStatusCode);
        }
        //return { ac: credentials.accessCode, vc: credentials.verifyCode };
        // ****************************
        var results = vistALogin(credentials.accessCode, credentials.verifyCode, ewd);
        // ****************************
        console.log('results: ' + JSON.stringify(results));
        if (results.error) {
            ewd.util.deleteSession(sessid);
            return errorResponse(results.error, errorStatusCode);
        } else {
            // logged in
            session.$('cipherKey')._delete();
            session.$('VistA')._setDocument(results.data);
            var userKeys = ewd.query.keys;
            if (userKeys) {
                var hasKeys = ewd.mumps.function('USERKEYS^ZZTDP', results.data.DUZ, userKeys);
                if (hasKeys) {
                    var userKeysAsArray = userKeys.split('^');
                    var hasKeysAsArray = hasKeys.split('^');
                    var userKeysResult = userKeysAsArray.reduce(function(r, userKey, index) {
                        r[userKey] = hasKeysAsArray[index] !== '0';
                        return r;
                    }, {});
                    results.data.keys = userKeysResult;
                }
            }
            var ok = this.saveSymbolTable(ewd, session);
            return results.data;
        }
    },

    ddrLister3: function(params, session, ewd) {
        params.rpcName = 'DDR LISTER';
        params.rpcContext = 'DVBA CAPRI GUI';
        params.rpcArgs = [];

        var ddrListerArgs = {
            FILE: params.FILE,
            FIELDS: params.FIELDS || '.01',
            FLAGS: params.FLAGS || 'IP',
            MAX: params.MAX || '1000',
            XREF: params.XREF || '#'
        };

        if (params.hasOwnProperty('IENS')) {
            ddrListerArgs.IENS = params.IENS;
        }
        if (params.hasOwnProperty('FROM')) {
            ddrListerArgs.FROM = params.FROM;
        }
        if (params.hasOwnProperty('ID')) {
            ddrListerArgs.ID = params.ID;
        }
        if (params.hasOwnProperty('SCREEN')) {
            ddrListerArgs.SCREEN = params.SCREEN;
        }
        if (params.hasOwnProperty('PART')) {
            ddrListerArgs.PART = params.PART;
        }

        params.rpcArgs.push({
            type: 'LIST',
            value: ddrListerArgs
        });

        var result = this.runRpc(params, session, ewd);

        if (!result.hasOwnProperty('value')) {
            return {
                error: true,
                errorResponse: JSON.stringify(result)
            };
        }

        var response = {
            data: []
        };
        var inData = false;
        for (var i = 1; result.value.hasOwnProperty(i.toString()); i++) {
            if (!inData && (result.value[i.toString()] === '[BEGIN_diERRORS]' || result.value[i.toString()].toUpperCase() == '[ERRORS]')) { // only need to check for error header in the first few records
                response.error = true;
                response.errorResponse = JSON.stringify(result);
                return response;
            }

            // just keep checking for start of data!
            if (!inData && (result.value[i.toString()] == '[BEGIN_diDATA]' || result.value[i.toString()].toUpperCase() == '[DATA]')) {
                inData = true;
                continue;
            }

            if (!inData) {
                continue;
            }

            response.data.push(result.value[i.toString()]);
        }

        return response;
    },

    // NOTE: this call should replace all custom DDR GETS ENTRY wrappers!! 
    ddrGetsEntry2: function(params, session, ewd) {
        params.rpcName = 'DDR GETS ENTRY DATA';
        params.rpcContext = 'DVBA CAPRI GUI';
        params.rpcArgs = [];
        var ddrArgs = {
            FILE: params.file,
            IENS: params.iens,
            FIELDS: params.fields || '*',
            FLAGS: params.flags || 'IEN'
        };

        if (ddrArgs.IENS.slice(-1) !== ',') { // if IENS doesn't end with comma, add it!
            ddrArgs.IENS += ',';
        }

        params.rpcArgs.push({
            type: 'LIST',
            value: ddrArgs
        });

        var result = this.runRpc(params, session, ewd);

        // parse - turn in to dictionary type object with 'I' and 'E' properties for internal and external values
        var response = {};
        var inData = false;
        for (var i = 1; result.value.hasOwnProperty(i.toString()); i++) {
            if (!inData && (result.value[i.toString()] === '[BEGIN_diERRORS]' || result.value[i.toString()].toUpperCase() == '[ERRORS]')) { // only need to check for error header in the first few records
                response.error = true;
                response.errorResponse = JSON.stringify(result);
                return response;
            }

            // just keep checking for start of data!
            if (!inData && (result.value[i.toString()] == '[BEGIN_diDATA]' || result.value[i.toString()].toUpperCase() == '[DATA]')) {
                inData = true;
                continue;
            }

            if (!inData) {
                continue;
            }

            var pieces = result.value[i.toString()].split('^');
            var fieldNo = pieces[2];
            var internal = pieces[3];
            var external = pieces.length > 4 ? pieces[4] : '';

            response[fieldNo] = {};
            response.iens = ddrArgs.IENS;

            if (internal == '[WORD PROCESSING]') {
                internal = '';
                i++;
                while (result.value[i.toString()] != '$$END$$' && result.value.hasOwnProperty(i.toString())) { // shouldn't really need second bool statement... being paranoid!
                    internal += (result.value[i.toString()] + '\r\n');
                    i++;
                }
            }

            response[fieldNo]['I'] = internal;
            response[fieldNo]['E'] = external;
        }

        return response;

    },

    getImagingOrderTypes: function(params, session, ewd) {
        params.rpcName = 'ORWDRA32 IMTYPSEL';
        params.rpcArgs = [];

        return this.runRpc(params, session, ewd);
    },
    getNotesWithText: function(params, session, ewd) {
        params.reportsTabName = 'OR_PN:PROGRESS NOTES~TIUPRG;ORDV04;15;';
        return this.runReportsTabRpc(params, session, ewd);
    },
    // end notes calls

    getHospitalLocations: function(params, session, ewd) {
        params.rpcName = 'ORWU1 NEWLOC';
        params.rpcArgs = [];
        // clean args 
        var target = '';
        var direction = '1';
        if (params.target !== undefined && params.target !== '') {
            target = params.target.toUpperCase();
        }
        if (params.direction !== undefined && params.direction !== '') {
            direction = params.direction;
        }

        params.rpcArgs.push({
            type: 'LITERAL',
            value: target
        });
        params.rpcArgs.push({
            type: 'LITERAL',
            value: direction
        });

        return this.runRpc(params, session, ewd);
    },
    // call to vista works
    getVisits: function(params, session, ewd) {
        params.rpcName = 'ORWCV VST';
        params.rpcArgs = [];

        var patientId = params.patientId;
        var fromDate = params.fromDate;
        var toDate = params.toDate;

        params.rpcArgs.push({
            type: 'LITERAL',
            value: patientId
        });
        params.rpcArgs.push({
            type: 'LITERAL',
            value: fromDate
        });
        params.rpcArgs.push({
            type: 'LITERAL',
            value: toDate
        });
        params.rpcArgs.push({
            type: 'LITERAL',
            value: '1'
        });

        return this.runRpc(params, session, ewd);
    },

    // call to vista works
    getVitalSigns: function(params, session, ewd) {
        params.reportsTabName = 'OR_VS:VITAL SIGNS~VS;ORDV04;47;';
        return this.runReportsTabRpc(params, session, ewd);
    },
    getClinicalWarnings: function(params, session, ewd) {
        //params.reportsTabName = 'OR_IM:IMMUNIZATIONS~;;207;';
        params.reportsTabName = 'OR_CW:CLINICAL WARNINGS~;;4;';
        return this.runReportsTabRpc(params, session, ewd);
    },
    runRpc: function(params, session, ewd) {
        // TODO - how to handle issues? throw exception? return JSON obj with error message?
        if (params.rpcName == 'DDR LISTER' || params.rpcName == 'DDR GETS ENTRY DATA') {
            params.rpcContext = 'DVBA CAPRI GUI';
        } else {
            params.rpcContext = 'OR CPRS GUI CHART';
        }

        var xqcsRef = new ewd.mumps.GlobalNode('TMP', ['XQCS', process.pid]);
        xqcsRef._delete();

        var gloRef = new ewd.mumps.GlobalNode('TMP', [process.pid]);
        // **** essential addition by Rob! - must clear down the temporary global first:
        gloRef._delete();
        var vista = session.$('VistA');
        var data = {
            name: params.rpcName,
            duz: vista.$('DUZ')._value,
            dt: vista.$('DT')._value,
            division: '500', // MUST SET THIS EQUAL TO STATION ID!!! ORDER WRITING FAILS WITHOUT IT
            context: params.rpcContext,
            input: params.rpcArgs
        };
        gloRef._setDocument(data, true, 1);

        var status = ewd.mumps.function('RPCEXEC^ZZTDP', '^TMP(' + process.pid + ')');
        var resultsNode = gloRef.$('result');
        var results = resultsNode._getDocument();

        //if (params.rpcName == 'ORWDX SEND') {
        //	throw new Error('Intentionally blowing up on ORWDX SEND');
        //}

        if (!params.hasOwnProperty('deleteGlobal') || params.deleteGlobal) { // if we didn't set flag or if it's set true
            gloRef._delete();
        }
        return results;
    },

    // need this special RPC wrapper for creating an order because the JSON -> MUMPS arg passing
    // doesn't support the format for order checks
    runRpcForCreateOrder: function(params, session, ewd) {
        params.rpcContext = 'OR CPRS GUI CHART';

        var xqcsRef = new ewd.mumps.GlobalNode('TMP', ['XQCS', process.pid]);
        xqcsRef._delete();

        var gloRef = new ewd.mumps.GlobalNode('TMP', [process.pid]);
        // **** essential addition by Rob! - must clear down the temporary global first:
        gloRef._delete();
        var vista = session.$('VistA');
        var data = {
            name: params.rpcName,
            duz: vista.$('DUZ')._value,
            dt: vista.$('DT')._value,
            division: '500', // MUST SET THIS EQUAL TO STATION ID!!! ORDER WRITING FAILS WITHOUT IT
            context: params.rpcContext,
            input: params.rpcArgs
        };
        gloRef._setDocument(data, true, 1);
        // special!
        if (params.orderCheckCount && params.orderCheckCount > 0) {
            var specialGlobalCountSet = {
                'ORCHECK': params.orderCheckCount
            };
            var specialGloRef = new ewd.mumps.GlobalNode('TMP', [process.pid, 'input', 8, 'value']);
            specialGloRef._setDocument(specialGlobalCountSet);
        }
        // end special

        var status = ewd.mumps.function('RPCEXEC^ZZTDP', '^TMP(' + process.pid + ')');
        var resultsNode = gloRef.$('result');
        var results = resultsNode._getDocument();

        gloRef._delete();
        return results;
    },

    // need this special RPC wrapper for creating an order because the JSON -> MUMPS arg passing
    // doesn't support the format for order checks
    runRpcForSaveOrderChecks: function(params, session, ewd) {
        params.rpcContext = 'OR CPRS GUI CHART';

        var xqcsRef = new ewd.mumps.GlobalNode('TMP', ['XQCS', process.pid]);
        xqcsRef._delete();

        var gloRef = new ewd.mumps.GlobalNode('TMP', [process.pid]);
        // **** essential addition by Rob! - must clear down the temporary global first:
        gloRef._delete();
        var vista = session.$('VistA');
        var data = {
            name: params.rpcName,
            duz: vista.$('DUZ')._value,
            dt: vista.$('DT')._value,
            division: '500', // MUST SET THIS EQUAL TO STATION ID!!! ORDER WRITING FAILS WITHOUT IT
            context: params.rpcContext,
            input: params.rpcArgs
        };
        gloRef._setDocument(data, true, 1);
        // special!
        if (params.checkLinesCount && params.checkLinesCount > 0) {
            var specialGlobalCountSet = {
                'ORCHECKS': params.checkLinesCount
            };
            var specialGloRef = new ewd.mumps.GlobalNode('TMP', [process.pid, 'input', 3, 'value']);
            specialGloRef._setDocument(specialGlobalCountSet);
        }
        // end special

        var status = ewd.mumps.function('RPCEXEC^ZZTDP', '^TMP(' + process.pid + ')');
        var resultsNode = gloRef.$('result');
        var results = resultsNode._getDocument();
        gloRef._delete();
        return results;
    },

    runReportsTabRpc: function(params, session, ewd) {
        // params => { reportsTabName:'OR_VS:VITAL SIGNS~VS;ORDV04;47;', patientId: PID }
        // params => { reportsTabName:'OR_VS:VITAL SIGNS~VS;ORDV04;47;', patientId: PID, fromDate: '20150704', toDate:'20150731', nRpts: 25 }
        var fromDate = '0';
        var toDate = '0';
        var nRpts = '0';

        // setup date and nrpts so they have everything for RPC builder below
        if (params.hasOwnProperty('fromDate') && params.fromDate) {
            fromDate = params.fromDate;
        }
        if (params.hasOwnProperty('toDate') && params.toDate) {
            toDate = params.toDate;
        }
        if (params.hasOwnProperty('nRpts') && params.nRpts) {
            nRpts = params.nRpts;
        }

        var xqcsRef = new ewd.mumps.GlobalNode('TMP', ['XQCS', process.pid]);
        xqcsRef._delete();

        var gloRef = new ewd.mumps.GlobalNode('TMP', [process.pid]);
        // **** essential addition by Rob! - must clear down the temporary global first:
        gloRef._delete();
        var vista = session.$('VistA');
        var data = {
            name: 'ORWRP REPORT TEXT',
            duz: vista.$('DUZ')._value,
            dt: vista.$('DT')._value,
            division: '500', // MUST SET THIS EQUAL TO STATION ID!!! ORDER WRITING FAILS WITHOUT IT
            context: 'OR CPRS GUI CHART', // reports tab RPC is always in CPRS context
            input: [{
                    type: 'LITERAL',
                    value: params.patientId
                }, {
                    type: 'LITERAL',
                    value: (params.reportsTabName + nRpts)
                }, {
                    type: 'LITERAL',
                    value: ''
                }, {
                    type: 'LITERAL',
                    value: (fromDate == '0' ? '50000' : '')
                }, // if specifying fromDate then set to empty string, otherwise 50000
                {
                    type: 'LITERAL',
                    value: ''
                }, {
                    type: 'LITERAL',
                    value: fromDate
                }, {
                    type: 'LITERAL',
                    value: toDate
                },
            ]
        };
        gloRef._setDocument(data, true, 1);

        var status = ewd.mumps.function('RPCEXEC^ZZTDP', '^TMP(' + process.pid + ')');
        var resultsNode = gloRef.$('result');
        var results = resultsNode._getDocument();

        gloRef._delete();

        // the reports tab RPC returns a reference to where it stored the data - need to get it!! (and delete it)
        var resultRef = results.value;
        var resultGlo = getGlobalNodeFromRef(resultRef, ewd);
        results = resultGlo._getDocument();
        resultGlo._delete();

        return results;
    },

    getVariableValue: function(arg, session, ewd) {
        return ewd.mumps.function('GETV^XWBBRK', arg);
    },

    encryptRpcParameter: function(arg, session, ewd) {
        return ewd.mumps.function('ENCRYP^XUSRB1', arg);
    },

    setContext: function(contextName, session, ewd) {
        if (!contextName || contextName === '') {
            contextName = 'OR CPRS GUI CHART';
        }
        var params = {
            rpcName: 'XWB CREATE CONTEXT',
            rpcArgs: []
        };
        params.rpcArgs.push({
            type: 'LITERAL',
            value: this.encryptRpcParameter(contextName, session, ewd)
        });
        var response = this.runRpc(params, session, ewd);
        if (!response || !response.value || response.value != '1') {
            throw new Error('Unable to set context: ' + JSON.stringify(response));
        }
    },

    getPatientsByName: function(prefix, max, ewd) {
        var patientIndex = new ewd.mumps.GlobalNode('DPT', ['B']);
        var results = [];
        var namesById = {};
        var i = 0;
        patientIndex._forPrefix(prefix.toUpperCase(), function(name, node) {
            node._forEach(function(id) {
                i++;
                if (i > max) {
                    return true;
                }
                results.push({
                    id: id,
                    text: name
                });
                namesById[id] = name;
            });
            if (i > max) {
                return true;
            }
        });
        return {
            results: results,
            namesById: namesById
        };
    },

    getPatientSummaryDetails: function(patientId, ewd) {
        var patient = new ewd.mumps.GlobalNode('DPT', [patientId, '0']);
        var patientRec0 = patient._value;
        var patientObj = patientRec0.split('^');
        return {
            EIN: patientId,
            name: patientObj[0],
            sex: patientObj[1],
            DOB: convertFtoStringDate(patientObj[2]),
            SSN: patientObj[8]
        };
    },
    clearSymbolTable: function(ewd) {
	return ewd.mumps.function("CLEAR^ZZTDPSES");
    },
    saveSymbolTable: function(ewd, session) {
	if (!session) {
	    session = ewd.session;
	}    
	var gloRef = '^' + ewd.map.global.session + '("session",' + session.sessid + ',"ewd_symbolTable")';
	return ewd.mumps.function("SAVE^ZZTDPSES", gloRef);
    },
    restoreSymbolTable: function(ewd, session) {
	if (!session) {
	    session = ewd.session;
	}    
	var gloRef = '^' + ewd.map.global.session + '("session",' + session.sessid + ',"ewd_symbolTable")';
	return ewd.mumps.function("RESTORE^ZZTDPSES", gloRef);
    }
};
