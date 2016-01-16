/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('template_layout', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    template_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'template',
        key: 'id'
      }
    },
    panel_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'panel',
        key: 'id'
      }
    },
    panel_order: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    optional: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    tableName: 'template_layout',
    freezeTableName: true
  });
};
