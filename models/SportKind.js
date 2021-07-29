const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');

const SportKind = sequelize.define(
    'sportKind',
    {
        sportKind: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: 'sportKind'
        },
        program: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: 'sportKind'
        },
        registrationNumber: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

module.exports = SportKind
