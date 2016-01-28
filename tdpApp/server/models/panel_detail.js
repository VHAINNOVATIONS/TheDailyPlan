'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('panel_detail', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    panel_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'panel',
        key: 'id'
      }
    },
    panel_setting_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'panel_setting',
        key: 'id'
      }
    },
    detail_value: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'panel_detail',
    freezeTableName: true
  });
};
