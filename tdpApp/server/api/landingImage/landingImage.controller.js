'use strict';

var path = require('path');

var fs = require('fs-extra-promise');
var _ = require('lodash');

var models = require('../../models/index');
var config = require('../../config/environment');

var rootPath = path.join(config.root, 'common/assets/landing_images');
var archievePath = path.join(rootPath, 'archieve');
var stagingPath = path.join(rootPath, 'staging');

exports.getActive = function (req, res, next) {
    var options = {
        raw: true,
        attributes: ['name'],
        where: {
            active: true
        }
    };
    models.landing_image.findAll(options).then(function(images) {
        var paths = images.map(function(img) {
            return path.join('/common/assets/landing_images', img.name);
        });
        return paths;
    }).then(function(imagePaths) {
        res.status(200).json(imagePaths);
    }).catch(function(err) {
        res.status(401).json(err);
    });
};

exports.get = function (req, res, next) {
    var options = {
        raw: true,
        attributes: ['name', 'active']
    };
    models.landing_image.findAll(options).then(function(images) {
        images.forEach(function(img) {
            img.path = path.join('/common/assets/landing_images', img.name);
        });
        return images;
    }).then(function(images) {
        res.status(200).json(images);
    }).catch(function(err) {
        res.status(401).json(err);
    });
};
