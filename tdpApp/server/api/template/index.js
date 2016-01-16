'use strict';

var express = require('express');
var router = express.Router();
var auth = require('../../auth/auth.service');
var models = require('../../models/index');

// get all templates
router.get('/', function(req, res) {
  models.template.findAll({}).then(function(templates) {
    res.json(templates);
  });
});

// get single template
router.get('/:id', function(req, res) {
  models.template.find({
    where: {
      id: req.params.id
    }
  }).then(function(template) {
    res.json(template);
  });
});

// add new template
router.post('/', function(req, res) {
  models.template.create({
    template_name: req.body.template_name,
    template_description: req.body.template_description,
    location_id: req.body.location_id,
    active: req.body.active,
    template_owner: req.body.template_owner
  }).then(function(template) {
    res.json(template);
  });
});

// update single template
router.put('/:id', function(req, res) {
  models.template.find({
    where: {
      id: req.params.id
    }
  }).then(function(template) {
    if(template){
      template.updateAttributes({
        template_name: req.body.template_name,
        template_description: req.body.template_description,
        location_id: req.body.location_id,
        active: req.body.active,
        template_owner: req.body.active
      }).then(function(template) {
        res.send(template);
      });
    }
  });
});

// delete a single template
router.delete('/:id', function(req, res) {
  models.template.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(template) {
    res.json(template);
  });
});

module.exports = router;
