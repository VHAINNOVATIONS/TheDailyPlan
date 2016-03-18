'use strict';

module.exports = {
    getAllergies: function(params, session, ewd) {
        var r = ewd.mumps.function('ALLERGY^ZZTDP', params.patientId);
        if (r === '') {
            r = null;
        } else {
            r = parseInt(r);
        }
        var result = {
            status: r
        };
        if (r) {
            var gloRef = new ewd.mumps.GlobalNode('TMP', [process.pid, 'TDP_ALLERGIES']);
            result.allergies = gloRef._getDocument(1);
            gloRef._delete();
        }
        return result;
    }
};
