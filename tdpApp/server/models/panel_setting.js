'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('panel_setting', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        panel_type_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'panel_type',
                key: 'id'
            }
        },
        setting_type: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        setting_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        setting_value: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'panel_setting',
        freezeTableName: true,
        classMethods: {
            associate: function(models) {
                models.panel_setting.hasMany(models.panel_detail, {
                    foreignKey: 'panel_setting_id',
                    targetKey: 'id'
                });
            }
        }
    });
};
