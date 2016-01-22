/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('facility_message', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    facility_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'facility',
        key: 'id'
      }
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '1'
    },
    message_order: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    message_text: {
      type: DataTypes.STRING,
      allowNull: false
    },
    message_headline: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'facility_message',
    freezeTableName: true
  });
};
