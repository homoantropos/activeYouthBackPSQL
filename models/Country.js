const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');

const Country = sequelize.define(
    'country', {
        country_name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

module.exports = Country
