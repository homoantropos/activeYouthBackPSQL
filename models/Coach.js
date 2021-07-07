const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');


const Coach = sequelize.define('coach', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: 'coach'
        },
        surname: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: 'coach'
        },
        fathersName: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: 'coach'
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    })

module.exports = Coach
