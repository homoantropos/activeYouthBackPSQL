const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');

const Appointment = require('./Appointment');
const Appointment_place = require('./AppointmentPlace');
const Participant = require('./Participant');
const Coach = require('./Coach');
const Educational_entity = require('./EducationEntity');
const Country = require('./Country');
const Town = require('./Town');
const Region = require('./Region');
const SportKind = require('./SportKind');
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
            allowNull: false,
            unique: 'result'
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
)

Appointment.hasMany(Result, {
    onDelete: "CASCADE",
    onUpdate: 'CASCADE'
});

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

Result.addScope(
    'getFullResults', {
        attributes: {
            exclude: ['participantId', 'regionId', 'coachId', 'educationalEntityId', 'userId']
        },
        include: [
            {
                model: Appointment,
                attributes: {
                    exclude:
                        [
                            'logoSrc',
                            'kpkv',
                            'haracter',
                            'organiser',
                            'appointmentPlaceId',
                            'userId',
                            'sportKindId',
                            'duration',
                            'organizationsParticipants'
                        ]
                },
                include: [
                    {
                        model: Appointment_place,
                        attributes: {exclude: ['id', 'countryId', 'regionId', 'townId', 'appointmentId', 'address']},
                        include: [
                            {
                                model: Country,
                                attributes: {exclude: ['id']}
                            },
                            {
                                model: Region,
                                attributes: {exclude: ['id', 'countryId']}
                            },
                            {
                                model: Town,
                                attributes: {exclude: ['id', 'regionId']}
                            }
                        ]
                    },
                    {
                        model: SportKind,
                        attributes: {
                            exclude: ['id', 'program', 'registration_number']
                        }
                    }
                ]
            },
            {
                model: Participant
            },
            {
                model: Coach
            },
            {
                model: Educational_entity,
                attributes: {exclude: ['regionId']}
            },
            {
                model: Region
            },
            {
                model: User,
                attributes: {exclude: ['role', 'password', 'id']}
            }
        ]
    }
)
module.exports = Result
