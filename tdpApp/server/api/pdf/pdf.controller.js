'use strict';

var _ = require('lodash');

var pdf = require('../../pdf');

exports.index = function(req, res) {
    var selected = req.body.selected;
    var options = req.body.options;
    var patientIds = _.map(selected, 'id');
    var templateIds = _.map(selected, 'templateID');
    pdf.write(req.session, req.user, patientIds, templateIds, options, function(err, result) {
      if (err) {
          res.status(401).json(err);
      } else {
          res.status(200).json(result);
      }

    });
};
