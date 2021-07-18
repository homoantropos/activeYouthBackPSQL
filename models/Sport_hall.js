const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');
const Town = require('../models/Town');

const Sport_hall = sequelize.define(
    'sport_hall',
    {
        sport_hall_name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: 'sportHall'
        },
        address: {
            type: Sequelize.TEXT,
            allowNull: false,
            unique: 'sportHall'
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    });

Town.hasMany(Sport_hall, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Sport_hall.belongsTo(Town, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

module.exports = Sport_hall
