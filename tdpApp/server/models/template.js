'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('template', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    template_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    template_description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    facility_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    location_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    template_owner: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'template',
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        models.template.hasMany(models.template_layout, {
          foreignKey: 'template_id',
          targetKey: 'template_id'
        });
        models.template.belongsTo(models.facility, {
          foreignKey: 'facility_id',
          targetKey: 'id'
        });
      }
    }
  });
};
