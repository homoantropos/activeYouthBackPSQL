const Sequelize = require('sequelize');
const sequelize= require('../database/sequelize');



const Coach = sequelize.define('coach', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: 'Coach'
    },
    surname: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: 'Coach'
    },
    fathername: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: 'Coach'
    },
    dateofbirth: {
        type: Sequelize.DATE,
        allowNull: false,
        unique: 'Coach'
    }
}, {
    freezeTableName: true,
    updatedAt: false
})

module.exports = Coach
