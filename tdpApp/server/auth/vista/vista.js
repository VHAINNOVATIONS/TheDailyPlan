var vista = require('../../tdpvistaaccess');
var vistaSession = null;

module.exports = exports = function(req, res, next) {
	if (!vistaSession) {
			vista.newSession(function (err, session) {
	        if (err) {
	    		if (err) return res.status(401).json(err);
	        } else {
	            vistaSession = session;
	            req.session = session;
	        }
	    });
	} else {
		req.session = vistaSession;
	}
	next();
}