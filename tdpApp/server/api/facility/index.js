'use strict';

var express = require('express');
var router = express.Router();
var auth = require('../../auth/auth.service');
var models = require('../../models/index');

// get all facilities
router.get('/', function(req, res) {
  models.facility.findAll({}).then(function(facilities) {
    res.json(facilities);
  });
});

// get single facility
router.get('/:id', function(req, res) {
  models.facility.find({
    where: {
      id: req.params.id
    }
  }).then(function(facility) {
    res.json(facility);
  });
});

// add new facility
router.post('/', function(req, res) {
  models.facility.create({
    name: req.body.name,
    station: req.body.station,
    visn: req.body.visn,
    server: req.body.server
  }).then(function(facility) {
    res.json(facility);
  });
});

// update single facility
router.put('/:id', function(req, res) {
  models.facility.find({
    where: {
      id: req.params.id
    }
  }).then(function(facility) {
    if(facility){
      facility.updateAttributes({
        name: req.body.name,
        station: req.body.station,
        visn: req.body.visn,
        server: req.body.server
      }).then(function(facility) {
        res.send(facility);
      });
    }
  });
});

// delete a single facility
router.delete('/:id', function(req, res) {
  models.facility.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(facility) {
    res.json(facility);
  });
});

module.exports = router;