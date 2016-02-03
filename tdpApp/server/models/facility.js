'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('facility', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    station: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    visn: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    server: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'facility',
    freezeTableName: true
  });
};
