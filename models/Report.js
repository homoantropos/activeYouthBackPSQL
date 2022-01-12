const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');

const Appointment = require('./Appointment');
const AppointmentPlace = require('./AppointmentPlace');
const Country = require('../models/Country');
const Region = require('../models/Region');
const Town = require('../models/Town');
const SportKind = require('./SportKind');

const Report = sequelize.define(
    'report',
    {
        countriesPlan: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        regionsPlan: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        educationEntityPlan: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        sportsmenPlan: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        coachesPlan: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        refereesPlan: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        othersPlan: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        totalPlan: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        personPerDayPlan: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

        countriesFact: {
            type: Sequelize.INTEGER,
        },
        regionsFact: {
            type: Sequelize.INTEGER,
        },
        educationEntityFact: {
            type: Sequelize.INTEGER,
        },
        sportsmenFact: {
            type: Sequelize.INTEGER,
        },
        coachesFact: {
            type: Sequelize.INTEGER,
        },
        refereesFact: {
            type: Sequelize.INTEGER,
        },
        othersFact: {
            type: Sequelize.INTEGER,
        },
        totalFact: {
            type: Sequelize.INTEGER,
        },
        personPerDayFact: {
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
                attributes: {exclude: ['id', 'appointmentPlaceId', 'sportKindId', 'userId']},
                include: [
                    {
                        model: SportKind,
                        attributes: {exclude: ['id', 'program', 'registrationNumber']}
                    },
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
                                attributes: {exclude: ['id', 'regionGroup', 'countryId']}
                            },
                            {
                                model: Town,
                                attributes: {exclude: ['id', 'regionId']}
                            },
                        ]
                    },
                ],
            }
        ],
    }
);

module.exports = Report
