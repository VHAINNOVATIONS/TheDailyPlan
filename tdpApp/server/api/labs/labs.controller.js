'use strict';

exports.index = function (req, res, next) {
  var patientId = req.query.patientId;
  var options = {
      occurances: parseInt(req.query.occurances, 10),
      backDays: parseInt(req.query.backdays, 10),
      isvertical: req.query.isvertical
  };
  console.log(options);
  if (req.query.testNames) {
    options.testNames = req.query.testNames;
  }

  req.session.getChemHemReports(req.user, patientId, options, function (err, body) {
      if (err) {
        return res.status(401).json(err);
      } else {
        res.status(200).json(body);
      }
  });
};

