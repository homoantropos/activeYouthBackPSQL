const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');
const Country = require('../models/Country');
const Region = require('../models/Region');

const Town = sequelize.define(
    'town',
    {
        town_name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

Country.hasMany(Town);
Region.hasMany(Town);
Town.belongsTo(Country, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION'
});
Town.belongsTo(Region, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION'
});

module.exports = Town
