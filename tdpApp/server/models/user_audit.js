'use strict';

module.exports = function(sequelize, dataTypes) {
    return sequelize.define('user_audit', {
        id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id_vista: {
            type: dataTypes.STRING,
            allowNull: false
        },
        patient_id_vista: {
            type: dataTypes.STRING,
            allowNull: false
        },
        action: {
            type: dataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'user_audit'
    });
};
