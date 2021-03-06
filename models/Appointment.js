const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');

const AppointmentPlace = require('./AppointmentPlace');
const SportKind = require('./SportKind');
const Country = require('../models/Country');
const Region = require('../models/Region');
const Town = require('../models/Town');
const User = require('../models/User');

const Appointment = sequelize.define(
    'appointment',
    {
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: 'appointment'
        },
        start: {
            type: Sequelize.DATE,
            allowNull: false,
            unique: 'appointment'
        },
        finish: {
            type: Sequelize.DATE,
            allowNull: false
        },
        duration: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        logoSrc: {
            type: Sequelize.STRING,
            allowNull: true
        },
        appointmentPlaceId: {
            type: Sequelize.INTEGER,
            unique: 'appointment'
        },
        organizationsParticipants: {
            type: Sequelize.STRING,
            allowNull: false
        },
        kpkv: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        haracter: {
            type: Sequelize.STRING,
            allowNull: false
        },
        participants: {
            type: Sequelize.STRING,
            allowNull: false
        },
        direction: {
            type: Sequelize.STRING,
            allowNull: false
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false
        },
        organiser: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    })

Appointment.belongsTo(AppointmentPlace,
    {
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE'
    });

AppointmentPlace.hasMany(Appointment);

SportKind.hasMany(Appointment);
Appointment.belongsTo(SportKind, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE'
})

User.hasMany(Appointment);
Appointment.belongsTo(User, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE'
})

Appointment.addScope(
    'fullAppointment', {
        include: [
            {
                model: AppointmentPlace,
                attributes: {exclude: ['id', 'countryId', 'regionId', 'townId', 'appointmentId']},
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
                    },
                ],
            },
            {
                model: SportKind,
                attributes: {exclude: ['id']}
            }
        ]
    });

module.exports = Appointment

