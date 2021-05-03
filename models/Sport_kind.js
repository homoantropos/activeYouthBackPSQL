const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');

const Sport_kind = sequelize.define(
    'sport_kind',
    {
        sport_kind: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: 'sport_kind'
        },
        program: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: 'sport_kind'
        },
        registration_number: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

module.exports = Sport_kind
