'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var db        = {};

// Create DB Connection
// Sequelize(database,user,password,config{})
// Options:
// dialect: 'mysql'|'mariadb'|'sqlite'|'postgres'|'mssql'
// port: '3306' or other port for specific db
var sequelize = new Sequelize(process.env.TDP_DB_DATABASE,
 process.env.TDP_DB_USER,
 process.env.TDP_DB_PW,
  {
  host: process.env.TDP_DB_HOST,
  port: process.env.TDP_DB_PORT,
  dialect: process.env.TDP_DB_DIALECT,
  pool: {
    max: process.env.TDP_DB_POOL_MAX,
    min: process.env.TDP_DB_MIN,
    idle: process.env.TDP_DB_IDLE
  }
});

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename);
  })
  .forEach(function(file) {
    if (file.slice(-3) !== '.js') return;
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
