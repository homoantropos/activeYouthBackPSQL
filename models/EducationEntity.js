const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');

const Country = require('../models/Country');
const Region = require('../models/Region');

const EducationEntity = sequelize.define(
    'educationEntity', {
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

Region.hasMany(EducationEntity)
EducationEntity.belongsTo(Region, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

EducationEntity.addScope(
    'getFullEduEntity', {
        attributes: {exclude: ['regionId']},
        include: {
            model: Region,
            attributes: {exclude: ['id', 'regionGroup', 'countryId']},
            include: {
                model: Country,
                attributes: {exclude: ['id']}
            }
        }
    }
);

module.exports = EducationEntity
