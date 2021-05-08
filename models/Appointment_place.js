const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');

const Country = require('../models/Country');
const Region = require('../models/Region');
const Town = require('../models/Town');

const Appointment_place = sequelize.define(
    'appointment_place',
    {
        appointment_place_name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: 'appointment_place'
        },
        address: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        countryId: {
            type: Sequelize.INTEGER,
            unique: 'appointment_place'
        },
        regionId: {
            type: Sequelize.INTEGER,
            unique: 'appointment_place'
        },
        townId: {
            type: Sequelize.INTEGER,
            unique: 'appointment_place'
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    });

Country.hasMany(Appointment_place);
Region.hasMany(Appointment_place);
Town.hasMany(Appointment_place);
Appointment_place.belongsTo(Country, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Appointment_place.belongsTo(Region, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Appointment_place.belongsTo(Town, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});


module.exports = Appointment_place
