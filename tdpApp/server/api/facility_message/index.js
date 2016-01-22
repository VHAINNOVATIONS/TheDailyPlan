'use strict';

var express = require('express');
var router = express.Router();
var auth = require('../../auth/auth.service');
var models = require('../../models/index');

// get all facility_messages
router.get('/', function(req, res) {
  models.facility_message.findAll({}).then(function(facility_messages) {
    res.json(facility_messages);
  });
});

// get all facility_messages by facility id
router.get('/byFacility/:id', function(req, res) {
  models.facility_message.findAll({
    where: {
      facility_id: req.params.id
    }
  }).then(function(facility_messages) {
    res.json(facility_messages);
  });
});

// get single facility_message
router.get('/:id', function(req, res) {
  models.facility_message.find({
    where: {
      id: req.params.id
    }
  }).then(function(facility_message) {
    res.json(facility_message);
  });
});

// add new facility_message
router.post('/', function(req, res) {
  models.facility_message.create({
    facility_id: req.body.facility_id,
    active: req.body.active,
    message_order: req.body.message_order,
    message_text: req.body.message_text,
    message_headline: req.body.message_headline
  }).then(function(facility_message) {
    res.json(facility_message);
  });
});

// update single facility_message
router.put('/:id', function(req, res) {
  models.facility_message.find({
    where: {
      id: req.params.id
    }
  }).then(function(facility_message) {
    if(facility_message){
      facility_message.updateAttributes({
        facility_id: req.body.facility_id,
        active: req.body.active,
        message_order: req.body.message_order,
        message_text: req.body.message_text,
        message_headline: req.body.message_headline
      }).then(function(facility_message) {
        res.send(facility_message);
      });
    }
  });
});

// delete a single facility_message
router.delete('/:id', function(req, res) {
  models.facility_message.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(facility_message) {
    res.json(facility_message);
  });
});

module.exports = router;
