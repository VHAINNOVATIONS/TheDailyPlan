"use strict";

var vistaLib = require('./VistALib');

var fillOrders = function(orders, params, session, ewd) {
	params.rpcName = 'ORWORR GET4LST';
	params.rpcArgs = [{
		type: 'LITERAL',
		value: '2',
	}, {
		type: 'LITERAL',
		value: params.vistANow
	}, {
		type: 'LIST',
		value: orders
	}];
	var response = vistaLib.runRpc(params, session, ewd);
	return response;
};

exports.getAllOrders = function(params, session, ewd) {
	params.rpcName = 'ORWORR AGET';
	params.rpcArgs = [{
		type: 'LITERAL',
		value: params.patientId
	}, {
		type: 'LITERAL',
		value: '2^0',
	}, {
		type: 'LITERAL',
		value: '1'
	}, {
		type: 'LITERAL',
		value: '-1'
	}, {
		type: 'LITERAL',
		value: '0'
	}, {
		type: 'LITERAL',
		value: ''
	}];
	var response = vistaLib.runRpc(params, session, ewd);
	var match = /^\^TMP\(\"ORR\",(\d+),\"(\d+,\d+)\"\)$/.exec(response.value);
	if (match && match[1] && match[2]) {
		var temp = new ewd.mumps.GlobalNode('TMP', ["ORR", match[1], match[2]]);
		var result = temp._getDocument();
		delete result[".1"];
		Object.keys(result).forEach(function(key) {
			result[key] = result[key].split('^')[0]
		});
		result = fillOrders(result, params, session, ewd);
		console.log(result);
		return result;
	} else {
		return vistaLib.errorResponse('Internal error obtaining orders.', 401);
	}
};

exports.getOrderTypes = function(params, session, ewd) {
	params.rpcName = 'ORWORDG MAPSEQ';
	var response = vistaLib.runRpc(params, session, ewd);
	return response;
};
