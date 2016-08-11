'use strict';

module.exports = function(sequelize, dataTypes) {
    return sequelize.define('user_pdf', {
        id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: dataTypes.STRING,
            allowNull: false
        },
        requestedDateTime: {
            type: dataTypes.DATE,
            allowNull: false
        },
        fileName:{
            type: dataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'user_pdf'
    });
};
