const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize')


const AppointmentFinancing = sequelize.define(
    'appointmentFinancing',
    {
        appointmentPlaceName: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: 'appointmentPlace'
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    })

module.exports = AppointmentFinancing
