const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');

const Appointment = require('./Appointment');
const Participant = require('./Participant');
const Coach = require('./Coach');
const Educational_entity = require('./Educational_entity');
const Region = require('./Region');
const User = require('./User');

const Result = sequelize.define('result',
    {
        discipline: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: 'result'
        },
        place: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        ratingPoints: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        completed: {
            type: Sequelize.BOOLEAN,
            default: false,
            allowNull: false
        },
        participantId: {
            type: Sequelize.INTEGER,
            unique: 'result'
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
)

Appointment.hasMany(Result);
Result.belongsTo(Appointment, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
});

Participant.hasMany(Result);
Result.belongsTo(Participant, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
});

Coach.hasMany(Result);
Result.belongsTo(Coach, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
});

Educational_entity.hasMany(Result);
Result.belongsTo(Educational_entity, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
});

Region.hasMany(Result);
Result.belongsTo(Region, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
});

User.hasMany(Result);
Result.belongsTo(User, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
});

module.exports = Result
