"use strict";

var vistaLib = require('./VistALib');

exports.resolveBoilerplates = function(params, session, ewd) {
    var result = ewd.mumps.function("BOILPLTS^ZZTDP", params.patientId, params.text) ;
    return result;
};
