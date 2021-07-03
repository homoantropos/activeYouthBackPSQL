const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');

const Participant = sequelize.define('participant', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: 'participant'
        },
        surname: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: 'participant'
        },
        fathersName: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: 'participant'
        },
        DoB: {
            type: Sequelize.DATE,
            allowNull: false,
            unique: 'participant'
        },
        gender: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: 'participant'
        },
        schoolchildOrStudent: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: 'participant'
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    });

module.exports = Participant
