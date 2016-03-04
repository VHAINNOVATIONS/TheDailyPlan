'use strict';

exports.index = function (req, res, next) {
  var id = req.params.id;

  req.session.getVitalSigns(id, {}, function (err, body) {
      if (err) {
          return res.status(401).json(err);
      } else {
          return res.status(200).json(body);
      }
  });
};
