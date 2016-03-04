'use strict';

var express = require('express');
var router = express.Router();
var auth = require('../../auth/auth.service');
var models = require('../../models/index');

// get all panels
router.get('/', function(req, res) {
  models.panel.findAll({}).then(function(panels) {
    res.json(panels);
  });
});

// get single panel
router.get('/:id', auth.isAuthenticated(), function(req, res) {
  models.panel.find({
    where: {
      id: req.params.id
    }
  }).then(function(panel) {
    res.json(panel);
  });
});

// add new panel
router.post('/', auth.isAuthenticated(), function(req, res) {
  models.panel.create({
    name: req.body.name,
    panel_type_id: req.body.panel_type_id,
    location_id: req.body.location_id,
    description: req.body.description,
    sizeX: req.body.sizeX,
    sizeY: req.body.sizeY
  }).then(function(panel) {
    res.json(panel);
  });
});

// update single panel
router.put('/:id', auth.isAuthenticated(), function(req, res) {
  models.panel.find({
    where: {
      id: req.params.id
    }
  }).then(function(panel) {
    if(panel){
      panel.updateAttributes({
        name: req.body.name,
        panel_type_id: req.body.panel_type_id,
        location_id: req.body.location_id,
        description: req.body.description,
        sizeX: req.body.sizeX,
        sizeY: req.body.sizeY
      }).then(function(panel) {
        res.send(panel);
      });
    }
  });
});

// delete a single panel
router.delete('/:id', auth.isAuthenticated(), function(req, res) {
  models.panel.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(panel) {
    res.json(panel);
  });
});

module.exports = router;
