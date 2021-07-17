const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');
const Region = require('../models/Region');
const Country = require("../models/Country");

const Town = sequelize.define(
    'town',
    {
        townName: {
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

Town.addScope('getFullTown', {
        attributes: {exclude: ['regionId']},
        include: [
            {
                model: Region,
                attributes: {
                    exclude: ['countryId', 'id']
                },
                include: {
                    model: Country,
                    attributes: {
                        exclude: ['id']
                    }
                }
            }]
    }
);

module.exports = Town
