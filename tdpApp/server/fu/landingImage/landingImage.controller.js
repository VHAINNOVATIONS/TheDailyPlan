'use strict';

var path = require('path');

var fs = require('fs-extra-promise');
var _ = require('lodash');

var models = require('../../models/index');
var config = require('../../config/environment');

var rootPath = path.join(config.root, 'client/common/assets/landing_images');
var archievePath = path.join(rootPath, 'archieve');
var stagingPath = path.join(rootPath, 'staging');

exports.index = function (req, res, next) {
    var deletedOnes = JSON.parse(req.body.deleted);
    var newOnes = JSON.parse(req.body.new);
    var dirtyOnes = JSON.parse(req.body.dirty);
    models.Sequelize.Promise.resolve("").then(function() {
        if (deletedOnes && deletedOnes.length) {
            var deletedWhere = deletedOnes.map(function(name) {
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
                return models.Sequelize.Promise.map(deletedOnes, function(name) {
                    var src = path.join(rootPath, name);
                    var tgt = path.join(archievePath, name);
                    return fs.rename(src, tgt);
                });
            })
        }
    }).then(function() {
        if (newOnes && newOnes.length) {
            return models.landing_image.bulkCreate(newOnes).then(function() {
                return models.Sequelize.Promise.map(req.files, function(obj) {
                    var src = obj.path;
                    var tgt = path.join(rootPath, obj.originalname);
                    return fs.rename(src, tgt);
                });
            })
        }
    }).then(function() {
        if (dirtyOnes && dirtyOnes.length) {
            return models.Sequelize.Promise.map(dirtyOnes, function(obj) {
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
