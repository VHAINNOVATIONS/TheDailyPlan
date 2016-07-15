'use strict';

var vistaLib = require('./VistALib');

exports.getPatientHealthFactors = function(params, session, ewd) {
    var gloRef = new ewd.mumps.GlobalNode('TMP', [process.pid, 'HX_FACTORS']);
    gloRef._delete();
    var result = ewd.mumps.function('HXFACTOR^ZZTDP', params.patientId, params.fromDate, params.toDate);
    var results = gloRef._getDocument();
    gloRef._delete();
    return results;
};

var translateArray = function(response) {
    var value = response && response.value;
    if (! value) {
        return [];
    }
    var count = Object.keys(value).length;
    var result = [];
    for (var i = 1; i <= count; ++i) {
        var p = value[i.toString()];
        if (p) {
	        var pieces = p.split('^');
	        var hf = pieces[1];
    	    result.push(hf);
    	}
    }
    return result;
};

exports.getSystemHealthFactors = function(session, ewd) {
    var params = {};
    params.rpcName = 'ORWPCE GET HEALTH FACTORS TY';
    params.rpcArgs = [];
    var response = vistaLib.runRpc(params, session, ewd);
    return translateArray(response);
};
