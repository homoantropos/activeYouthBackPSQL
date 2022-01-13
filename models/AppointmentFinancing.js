const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');
const Appointment = require('./Appointment');
const SportKind = require("./SportKind");

const AppointmentFinancing = sequelize.define(
    'appointmentFinancing',
    {
        kekv2210plan: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        kekv2220plan: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        kekv2240plan: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        kekv2210fact: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        kekv2220fact: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        kekv2240fact: {
            type: Sequelize.INTEGER,
            allowNull: true
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    })

AppointmentFinancing.belongsTo(Appointment,
    {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });

Appointment.hasMany(AppointmentFinancing);

AppointmentFinancing.addScope(
    'getFullAppointmentFinancing', {
        include: [
            {
                model: Appointment.scope('fullAppointment'),
                attributes: {
                    exclude: [
                        'id', 'logoSrc', 'organizationsParticipants', 'kpkv',
                        'haracter', 'appointmentPlaceId', 'sportKindId', 'userId'
                    ]
                },
                include: [
                    {
                        model: SportKind,
                        attributes: {exclude: ['id', 'program', 'registrationNumber']}
                    }
                ],
            }
        ]
    }
);

module.exports = AppointmentFinancing
