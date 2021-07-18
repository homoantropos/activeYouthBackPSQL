const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');
const Country = require('../models/Country');

const Region = sequelize.define(
    'region',
    {
        regionName: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        regionGroup: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    });

Country.hasMany(Region, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Region.belongsTo(Country, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Region.addScope('getFullRegion', {
    attributes: {
        exclude: [
            'countryId'
        ]
    },
    include: {
        model: Country
    }
})
module.exports = Region
