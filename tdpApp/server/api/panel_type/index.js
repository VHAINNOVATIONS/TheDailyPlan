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
        }
    }).then(function(panel_types) {
        res.json(panel_types);
    });
});

module.exports = router;
