"use strict";

var vistaLib = require('./VistALib');

var toArrayWithNameId = function(input) {
    var result = Object.keys(input.value).reduce(function(r, key) {
		var line = input.value[key];
		var pieces = line.split('^');
		var location = {
			id: pieces[0],
			name: pieces[1]
		};
		r.push(location);
		return r;
	}, []);
	return result;
};

exports.getClinics = function(session, ewd) {
	var params = {};
	params.rpcName = 'ORWU1 NEWLOC';
	params.rpcArgs = [{
		type: 'LITERAL',
		value: ''
	}, {
		type: 'LITERAL',
		value: '1',
	}];
	var response = vistaLib.runRpc(params, session, ewd);
	var result = toArrayWithNameId(response);
	return result;
};

exports.getWards = function(session, ewd) {
	var params = {};
	params.rpcName = 'ORQPT WARDS';
	params.rpcArgs = [];
	var response = vistaLib.runRpc(params, session, ewd);
	var result = toArrayWithNameId(response);
	return result;
};

exports.getPatientsByWard = function(params, session, ewd) {
	params.rpcName = 'ORWPT BYWARD';
	params.rpcArgs = [{
		type: 'LITERAL',
		value: params.wardId
	}];
	var response = vistaLib.runRpc(params, session, ewd);
	return response;
};

exports.getPatientsByClinic = function(params, session, ewd) {
	params.rpcName = 'ORWPT BYWARD';
	params.rpcArgs = [{
		type: 'LITERAL',
		value: params.clinicId
	}, {
    	type: 'LITERAL',
		value: params.fromDate
    }, {
    	type: 'LITERAL',
        value: params.toDate
	}];
	var response = vistaLib.runRpc(params, session, ewd);
	return response;
};

var translatePtList = function(response) {
	var value = response && response.value;
	if (! value) {
		return [];
	}
	var count = Object.keys(value).length;
	var result = [];
	for (var i=1; i<=count; ++i) {
		var pt = value[i.toString()];
		var pieces = pt.split('^');
		result.push({
			id: pieces[0],
			text: pieces[1]
		});
	}
	return result;
};

exports.getPatientsLast5 = function (last5, session, ewd) {
	var params = {};
	params.rpcName = 'ORWPT LAST5';
	params.rpcArgs = [{
		type: 'LITERAL',
		value: last5
	}];
	var response = vistaLib.runRpc(params, session, ewd);
	var result = translatePtList(response);
	return result;
};

exports.getPatientsFullSSN = function (fullSSN, session, ewd) {
	var params = {};
	params.rpcName = 'ORWPT FULLSSN';
	params.rpcArgs = [{
		type: 'LITERAL',
		value: fullSSN
	}];
	var response = vistaLib.runRpc(params, session, ewd);
	var result = translatePtList(response);
	return result;
};
