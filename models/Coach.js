const Sequelize = require('sequelize');
const sequelize= require('../database/sequelize');



const coach = sequelize.define('Сoach', {
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
    },
    dateofbirth: {
        type: Sequelize.DATE,
        allowNull: false,
        unique: 'coach'
    }
})

module.exports = coach
