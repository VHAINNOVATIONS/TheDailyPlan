'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('landing_image', {
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
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
        tableName: 'landing_image',
        freezeTableName: true
    });
};
