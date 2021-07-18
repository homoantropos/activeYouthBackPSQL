const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');

const Country = sequelize.define(
    'country', {
        countryName: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });


module.exports = Country
