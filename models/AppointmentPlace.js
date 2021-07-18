const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');

const Country = require('../models/Country');
const Region = require('../models/Region');
const Town = require('../models/Town');

const AppointmentPlace = sequelize.define(
    'appointmentPlace',
    {
        appointmentPlaceName: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: 'appointmentPlace'
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
            unique: 'appointmentPlace'
        },
        regionId: {
            type: Sequelize.INTEGER,
            unique: 'appointmentPlace'
        },
        townId: {
            type: Sequelize.INTEGER,
            unique: 'appointmentPlace'
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    });

Country.hasMany(AppointmentPlace);
Region.hasMany(AppointmentPlace);
Town.hasMany(AppointmentPlace);
AppointmentPlace.belongsTo(Country, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
AppointmentPlace.belongsTo(Region, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
AppointmentPlace.belongsTo(Town, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

AppointmentPlace.addScope(
    'appointmentPlace', {
        attributes: {exclude: ['countryId', 'regionId', 'townId', 'appointmentId']},
        include: [
            {
                model: Country,
                attributes: {exclude: ['id']}
            },
            {
                model: Region,
                attributes: {exclude: ['id']}
            },
            {
                model: Town,
                attributes: {exclude: ['id']}
            }
        ]
    }
)

module.exports = AppointmentPlace
