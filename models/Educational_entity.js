const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');

const Country = require('../models/Country');
const Region = require('../models/Region');

const Educational_entity = sequelize.define(
    'educational_entity', {
        name: {
            type: Sequelize.TEXT,
            allowNull: false,
            unique: 'eduEntity'
        },
        eduEntityType: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: 'eduEntity'
        },
        category: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        regionId: {
            type: Sequelize.INTEGER,
            unique: 'eduEntity'
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
)

Region.hasMany(Educational_entity)
Educational_entity.belongsTo(Region, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Educational_entity.addScope(
    'getFullEduEntity', {
        attributes: {exclude: ['regionId']},
        include: {
            model: Region,
            attributes: {exclude: ['id', 'region_group', 'countryId']},
            include: {
                model: Country,
                attributes: {exclude: ['id']}
            }
        }
    }
);

module.exports = Educational_entity
