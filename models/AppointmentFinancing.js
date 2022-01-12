const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');

const Appointment = require('../models/Appointment');
const SportKind = require("./SportKind");

const AppointmentFinancing = sequelize.define(
    'appointmentFinancing',
    {
        kekv2210plan: {
            type: Sequelize.NUMBER,
            allowNull: false
        },
        kekv2220plan: {
            type: Sequelize.NUMBER,
            allowNull: false
        },
        kekv2240plan: {
            type: Sequelize.NUMBER,
            allowNull: false
        },
        kekv2210fact: {
            type: Sequelize.NUMBER,
            allowNull: true
        },
        kekv2220fact: {
            type: Sequelize.NUMBER,
            allowNull: true
        },
        kekv2240fact: {
            type: Sequelize.NUMBER,
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

Appointment.hasOne(AppointmentFinancing);

AppointmentFinancing.addScope(
    'getFullAppointmentFinancing', {
        include: [
            {
                model: Appointment,
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
