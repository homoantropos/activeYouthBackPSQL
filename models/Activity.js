const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');
const User = require('../models/User');

const Activity = sequelize.define('activity', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    kindOfActivity: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true
})

User.hasMany(Activity);
Activity.belongsTo(User, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION'
});

module.exports = Activity
