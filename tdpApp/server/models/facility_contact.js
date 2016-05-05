'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('facility_contact', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        facilityId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            field: 'facility_id',
            references: {
                model: 'facility',
                key: 'id'
            }
        },
        title1: {
            type: DataTypes.STRING,
            field: 'title_1'
        },
        title2: {
            type: DataTypes.STRING,
            field: 'title_2'
        },
        title3: {
            type: DataTypes.STRING,
            field: 'title_3'
        },
        phone: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
    }, {
        tableName: 'facility_contact',
        freezeTableName: true,
        timestamps: false
    });
};
