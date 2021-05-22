const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');

const Appointment_place = require('../models/Appointment_place');
const Sport_kind = require('../models/Sport_kind');
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

Appointment.belongsTo(Appointment_place,
    {
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE'
    });

Appointment_place.hasMany(Appointment);

Sport_kind.hasMany(Appointment);
Appointment.belongsTo(Sport_kind, {
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
                model: Appointment_place,
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
                model: Sport_kind,
                attributes: {exclude: ['id']}
            }
        ]
    });

module.exports = Appointment

