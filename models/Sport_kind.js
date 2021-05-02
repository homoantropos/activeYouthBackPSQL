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
        code: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: 'sport_kind'
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

module.exports = Sport_kind
