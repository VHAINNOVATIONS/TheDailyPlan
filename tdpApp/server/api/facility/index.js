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

router.get('/landing/:id', function(req, res) {
    var id = req.params.id;
    var result = {};
    models.facility_message.findAll({
        where: {
            facility_id: id
        },
        raw: true
    }).then(function(facilityMessages) {
        result.messages = facilityMessages;
        return models.facility_contact.find({
            where: {
                facilityId: id
            },
            raw: true
        })
    }).then(function(contact) {
        result.contact = contact;
        res.json(result);
    });
});

router.get('/contact/:id', function(req, res) {
    var id = req.params.id;
    models.facility_contact.find({
        where: {
            facilityId: id
        },
        raw: true
    }).then(function(contact) {
        res.json(contact);
    });
});

router.post('/contact/:id', function(req, res) {
    var id = req.params.id;
    var body = req.body;
    models.facility_contact.find({
        where: {
            facilityId: id
        }
    }).then(function(contact) {
        ['title1', 'title2', 'title3', 'phone', 'email'].forEach(function(key) {
            var value = body[key];
            contact[key] = (value === undefined ? null : value);
        });
        return contact.save();
    }).then(function() {
        res.status(200).end();
    }).catch(function(err) {
        res.status(401).send(err);
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
router.post('/', auth.isAuthenticated(), function(req, res) {
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
router.put('/:id', auth.isAuthenticated(), function(req, res) {
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
router.delete('/:id', auth.isAuthenticated(), function(req, res) {
  models.facility.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(facility) {
    res.json(facility);
  });
});

module.exports = router;
