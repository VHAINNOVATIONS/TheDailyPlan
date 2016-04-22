'use strict';

var express = require('express');
var router = express.Router();
var auth = require('../../auth/auth.service');
var models = require('../../models/index');

// get all panel_types by facility id
router.get('/facility/:id', auth.isAuthenticated(), function(req, res) {
    models.panel_type.findAll({
        where: {
            facility_id: req.params.id
        },
        raw: true
    }).then(function(panelTypes) {
        return models.Sequelize.Promise.map(panelTypes, function(panelType) {
            return models.panel_setting.findAll({
                where: {
                    panel_type_id: panelType.id
                },
                raw: true
            }).then(function(settings) {
                panelType.panelSettings = settings;
                return panelType;
            })
        })
    }).then(function(panelTypes) {
        res.json(panelTypes);
    });
});

module.exports = router;
