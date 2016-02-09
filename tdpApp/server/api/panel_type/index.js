'use strict';

var express = require('express');
var router = express.Router();
var auth = require('../../auth/auth.service');
var models = require('../../models/index');

// get all panel_types
router.get('/', function(req, res) {
  models.panel_type.findAll({}).then(function(panel_types) {
    res.json(panel_types);
  });
});

// get all panel_types by facility id
router.get('/facility/:id', function(req, res) {
  models.panel_type.findAll({
    where: {
      facility_id: req.params.id
    }
  }).then(function(panel_types) {
    res.json(panel_types);
  });
});

// get single panel_type
router.get('/:id', function(req, res) {
  models.panel_type.find({
    where: {
      id: req.params.id
    }
  }).then(function(panel_type) {
    res.json(panel_type);
  });
});

// add new panel_type
router.post('/', function(req, res) {
  models.panel_type.create({
    title: req.body.title,
    directive: req.body.directive,
    scope_variable: req.body.scope_variable,
    minSizeX: req.body.minSizeX,
    minSizeY: req.body.minSizeY,
    mandatory: req.body.mandatory
  }).then(function(panel_type) {
    res.json(panel_type);
  });
});

// update single panel_type
router.put('/:id', function(req, res) {
  models.panel_type.find({
    where: {
      id: req.params.id
    }
  }).then(function(panel_type) {
    if(panel_type){
      panel_type.updateAttributes({
        title: req.body.title,
        directive: req.body.directive,
        scope_variable: req.body.scope_variable,
        minSizeX: req.body.minSizeX,
        minSizeY: req.body.minSizeY,
        mandatory: req.body.mandatory
      }).then(function(panel_type) {
        res.send(panel_type);
      });
    }
  });
});

// delete a single panel_type
router.delete('/:id', function(req, res) {
  models.panel_type.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(panel_type) {
    res.json(panel_type);
  });
});

module.exports = router;
