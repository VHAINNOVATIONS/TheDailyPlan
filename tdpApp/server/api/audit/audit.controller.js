'use strict';

var models = require('../../models/index');

exports.index = function(req, res) {
    models.user_audit.create({
        user_id_vista: req.body.userId,
        patient_id_vista: req.body.patientId,
        action: req.body.action
    }).then(function(user_audit) {
        res.send(user_audit);
    });
};

exports.multiple = function(req, res) {
    console.log(req.body);
    var records = req.body.map(function(r) {
        return {
            user_id_vista: r.userId,
            patient_id_vista: r.patientId,
            action: r.action
        };
    });
    models.user_audit.bulkCreate(records).then(function() {
        res.send({});
    }).catch(function() {
    });
};
