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
router.post('/all/:id', auth.isAuthenticated(), function(req, res) {
    var body = req.body;
    var id = req.params.id;
    models.facility_message.destroy({
        where: {
            facility_id: req.params.id
        }
    }).then(function() {
        var records = body.map(function(r, index) {
            return {
                active: true,
                facility_id: id,
                message_order: index + 1,
                message_text: r.message,
                message_headline: r.title
            }
        });
        return models.facility_message.bulkCreate(records);
    }).then(function() {
        res.status(200).end();
    }).catch(function(err) {
        res.status(401).end();
    })
});

// add new facility_message
router.post('/', auth.isAuthenticated(), function(req, res) {
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
router.put('/:id', auth.isAuthenticated(), function(req, res) {
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
router.delete('/:id', auth.isAuthenticated(), function(req, res) {
  models.facility_message.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(facility_message) {
    res.json(facility_message);
  });
});

module.exports = router;
