const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');
const Country = require('../models/Country');

const Region = sequelize.define(
    'region',
    {
        region_name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        region_group: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    });

Country.hasMany(Region);
Region.belongsTo(Country);

module.exports = Region
