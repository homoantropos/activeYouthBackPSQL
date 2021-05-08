const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');
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

Region.hasMany(Town);
Town.belongsTo(Region, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION'
});

module.exports = Town
