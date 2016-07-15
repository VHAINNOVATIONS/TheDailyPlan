'use strict';

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
        var temp = new ewd.mumps.GlobalNode('TMP', ['ORR', match[1], match[2]]);
        var result = temp._getDocument();
        delete result['.1'];
        Object.keys(result).forEach(function(key) {
            result[key] = result[key].split('^')[0];
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

var consultDetail = function(id, session, ewd) {
    var params = {};
    params.rpcName = 'ORQQCN GET CONSULT';
    params.rpcArgs = [{
        type: 'LITERAL',
        value: id
    }];
    var response = vistaLib.runRpc(params, session, ewd);
    return response;
};

exports.getConsults = function(params, session, ewd) {
    params.rpcName = 'ORWCS LIST OF CONSULT REPORTS';
    params.rpcArgs = [{
        type: 'LITERAL',
        value: params.patientId
    }];
    var response = vistaLib.runRpc(params, session, ewd);
    var gloRef = new ewd.mumps.GlobalNode('TMP', ['ORCS', process.pid]);
    var result = gloRef._getDocument(1) || [];
    gloRef._delete();
    var expandedResult = result.reduce(function(r, c) {
        c = c && c['0'];
        if (c) {
            var pieces = c.split('^');
            if (pieces[3] === 'PENDING') {
                var detail = consultDetail(pieces[0], session, ewd);
                detail = (detail && detail.value && detail.value[0]) || '';
                var detailPieces = detail.split('^');
                var consult = {
                    service: pieces[2],
                    requestDate: pieces[1],
                    earliestDate: detailPieces[23]
                };
                r.push(consult);
            }
        }
        return r;
    }, []);
    return expandedResult;
};
