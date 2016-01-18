'use strict';

var express = require('express');
var router = express.Router();
var auth = require('../../auth/auth.service');
var models = require('../../models/index');

// get all template_layouts
router.get('/', function(req, res) {
  models.template_layout.findAll({}).then(function(template_layouts) {
    res.json(template_layouts);
  });
});

// get all template_layouts
router.get('/byTemplate/:id', function(req, res) {
  models.template_layout.findAll({
    where: {
      template_id: req.params.id
    },
    order: [['panel_order', 'ASC']      ]
  }).then(function(template_layouts) {
    res.json(template_layouts);
  });
});

// get single template_layout
router.get('/:id', function(req, res) {
  models.template_layout.find({
    where: {
      id: req.params.id
    }
  }).then(function(template_layout) {
    res.json(template_layout);
  });
});

// add new template_layout
router.post('/', function(req, res) {
  models.template_layout.create({
    template_id: req.body.template_id,
    panel_id: req.body.panel_id,
    panel_order: req.body.panel_order,
    optional: req.body.optional
  }).then(function(template_layout) {
    res.json(template_layout);
  });
});

// update single template_layout
router.put('/:id', function(req, res) {
  models.template_layout.find({
    where: {
      id: req.params.id
    }
  }).then(function(template_layout) {
    if(template_layout){
      template_layout.updateAttributes({
        template_id: req.body.template_id,
        panel_id: req.body.panel_id,
        panel_order: req.body.panel_order,
        optional: req.body.optional
      }).then(function(template_layout) {
        res.send(template_layout);
      });
    }
  });
});

// delete a single template_layout
router.delete('/:id', function(req, res) {
  models.template_layout.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(template_layout) {
    res.json(template_layout);
  });
});

module.exports = router;
