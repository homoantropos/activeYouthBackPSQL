const Sequelize = require('sequelize');
const sequelize= require('../database/sequelize');



const coach = sequelize.define('Coach', {
    name: {

    },
    surname: {
        type: Sequelize.STRING,

    },
    fathername: {

    },
    dateOfBirth: {

    }
})

module.exports = coach
