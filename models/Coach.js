const Sequelize = require('sequelize');
const sequelize= require('../database/sequelize');



const Coach = sequelize.define('Coach', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: 'coach'
    },
    surname: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: 'coach'
    },
    fathername: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: 'coach'
    }
},
    {
        freezeTableName: true,
        timestamps: false
    })

module.exports = Coach
