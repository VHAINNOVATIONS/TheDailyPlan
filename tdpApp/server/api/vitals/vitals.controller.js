'use strict';

exports.index = function (req, res, next) {
  var id = req.params.id;
  var options = {};
  var occurances = req.query.occurances;
  if (occurances) {
    options.occurances = occurances;
  }
  req.session.getVitalSigns(req.user, id, options, function (err, body) {
      if (err) {
          return res.status(401).json(err);
      } else {
          return res.status(200).json(body);
      }
  });
};
