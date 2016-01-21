/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('panel_type', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    directive: {
      type: DataTypes.STRING,
      allowNull: false
    },
    scope_variable: {
      type: DataTypes.STRING,
      allowNull: false
    },
    minSizeX: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    minSizeY: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    mandatory: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    tableName: 'panel_type',
    freezeTableName: true
  });
};
