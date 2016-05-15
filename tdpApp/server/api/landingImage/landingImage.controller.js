'use strict';

var path = require('path');

var fs = require('fs-extra-promise');
var _ = require('lodash');

var models = require('../../models/index');
var config = require('../../config/environment');

var rootPath = path.join(config.root, 'common/assets/landing_images');
var archievePath = path.join(rootPath, 'archieve');
var stagingPath = path.join(rootPath, 'staging');

exports.index = function (req, res, next) {
    var input = req.body;
    models.Sequelize.Promise.resolve("").then(function() {
        if (input.deleted && input.deleted.length) {
            var deletedWhere = input.deleted.map(function(name) {
                return {
                    name: name
                };
            });
            var where = {
                $or: deletedWhere
            }
            return models.landing_image.destroy({
                where: where
            }).then(function() {
                return models.Sequelize.Promise.map(input.deleted, function(name) {
                    var src = path.join(rootPath, name);
                    var tgt = path.join(archievePath, name);
                    return fs.move(src, tgt);
                });
            })
        }
    }).then(function() {
        if (input.new && input.new.length) {
            return models.landing_image.bulkCreate(input.new).then(function() {
                return models.Sequelize.Promise.map(input.new, function(obj) {
                    var src = path.join(stagingPath, obj.name);
                    var tgt = path.join(rootPath, obj.name);
                    return fs.move(src, tgt);
                });
            })
        }
    }).then(function() {
        if (input.dirty && input.dirty.length) {
            return models.Sequelize.Promise.map(input.dirty, function(obj) {
                return models.landing_image.find({
                    where: {
                        name: obj.name
                    }
                }).then(function(dbObj) {
                    return dbObj.update({active: obj.active});
                });
            });
        }
    }).then(function() {
        res.status(200).end();
    }).catch(function(err) {
        res.status(401).json(err);
    });
};

var _get = function (activeOnly, req, res, next) {
    var options = {
        raw: true,
        attributes: ['name']
    };
    if (activeOnly) {
        options.where = {
            active: true
        };
    }
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

exports.getActive = function (req, res, next) {
    _get(true, req, res, next);
};

exports.get = function (req, res, next) {
    _get(false, req, res, next);
};
