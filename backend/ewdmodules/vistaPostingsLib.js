"use strict";

var vistaLib = require('./VistALib');

var fillPosting = function(ien, obj, session, ewd) {
    var gloRef = new ewd.mumps.GlobalNode('TMP', [process.pid, 'POSTING', ien.toString()]);
    gloRef._delete();
    var result = ewd.mumps.function("POSTING^ZZTDP", ien.toString()) ;
    var results = gloRef._getDocument();
    gloRef._delete();
    return results;
};

exports.getPostings = function(params, session, ewd) {
    params.rpcName = 'ORQQPP LIST';
    params.rpcArgs = [{
        type: 'LITERAL',
        value: params.patientId
    }];
    var response = vistaLib.runRpc(params, session, ewd);
    var postingLines = response && response.value;
    if (! postingLines) {
        return [];
    }
    var lineKeys = Object.keys(postingLines);
    lineKeys.sort();
    var postings = lineKeys.reduce(function(r, lineKey) {
        var line = postingLines[lineKey]
        var pieces = line.split('^');
        if (pieces[0]) {
            var result = fillPosting(pieces[0], result, session, ewd);
            r.push(result);
        }
        return r;
    }, []);
    return postings;;
};
