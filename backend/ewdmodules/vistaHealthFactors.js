'use strict';

var vistaLib = require('./VistALib');

exports.getPatientHealthFactors = function(params, session, ewd) {
	var gloRef = new ewd.mumps.GlobalNode('TMP', [process.pid, 'HX_FACTORS']);
    gloRef._delete();
    var result = ewd.mumps.function('HXFACTOR^ZZTDP', params.patientId, params.fromDate, params.toDate) ;
	var results = gloRef._getDocument();
    gloRef._delete();
    return results;
};
