const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');

const Appointment = require('./Appointment');
const AppointmentPlace = require('./Appointment_place');
const Country = require('../models/Country');
const Region = require('../models/Region');
const Town = require('../models/Town');

const Report = sequelize.define(
    'report',
    {
        countries_plan: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        regions_plan: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        educationEntity_plan: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        sportsmen_plan: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        coaches_plan: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        referees_plan: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        others_plan: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        total_plan: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        person_per_day_plan: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

        countries_fact: {
            type: Sequelize.INTEGER,
        },
        regions_fact: {
            type: Sequelize.INTEGER,
        },
        educationEntity_fact: {
            type: Sequelize.INTEGER,
        },
        sportsmen_fact: {
            type: Sequelize.INTEGER,
        },
        coaches_fact: {
            type: Sequelize.INTEGER,
        },
        referees_fact: {
            type: Sequelize.INTEGER,
        },
        others_fact: {
            type: Sequelize.INTEGER,
        },
        total_fact: {
            type: Sequelize.INTEGER,
        },
        person_per_day_fact: {
            type: Sequelize.INTEGER,
        },
    }, {
        freezeTableName: true,
        timestamps: false
    })

Report.belongsTo(Appointment, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Appointment.hasMany(Report);

Report.addScope(
    'fullReport',
    {
        include: [
            {
                model: Appointment,
                attributes: {exclude: []},
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
                    }
                ],
            }
        ]
    }
);

module.exports = Report
