'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('panel_type', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        facility_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        directive: {
            type: DataTypes.STRING,
            allowNull: false
        },
        service: {
            type: DataTypes.STRING,
            allowNull: true
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
        },
        enable_options: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
        tableName: 'panel_type',
        freezeTableName: true,
        classMethods: {
            associate: function(models) {
                models.panel_type.belongsTo(models.facility, {
                    foreignKey: 'facility_id',
                    targetKey: 'id'
                });
            }
        }
    });
};
