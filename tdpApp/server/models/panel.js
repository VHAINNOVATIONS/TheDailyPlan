/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('panel', {
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
    panel_type_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'panel_type',
        key: 'id'
      }
    },
    location_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sizeX: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    sizeY: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'panel',
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        models.panel.belongsTo(models.panel_type,{foreignKey: 'panel_type_id', targetKey: 'id'});
      }
    }
  });
};
