const Result = require('../models/Result');
const Appointment = require('../models/Appointment');
const Participant = require('../models/Participant');
const Coach = require('../models/Coach');
const coaches_service = require('../controllers/services/coaches_service');
const Region = require('../models/Region');
const EducationEntity = require('../models/EducationEntity');
const User = require('../models/User');
const ResultService = require('./services/result_service');

class Result_controller {

    async createResult(req, res) {
        try {
            const DoB = new Date(req.body.participant.DoB);
            const participant = await Participant.findOrCreate(
                {
                    where:
                        {
                            name: req.body.participant.name,
                            surname: req.body.participant.surname,
                            fathersName: req.body.participant.fathersName,
                            DoB,
                            gender: req.body.participant.gender,
                            schoolchildOrStudent: req.body.participant.schoolchildOrStudent
                        }
                },
            );

            const appointment = await Appointment.findOne(
                {
                    where:
                        {title: req.body.appointment.title}
                });

            const coach = await coaches_service.getCoachFromDB(req.body.coach);

            const educationEntity = await EducationEntity.findOne(
                {
                    where: {
                        name: req.body.educationEntity.name
                    }
                }
            );
            const region = await Region.findOne(
                {
                    where:
                        {regionName: req.body.region.regionName}
                }
            );

            const user = await User.findOne({
                where: {email: req.user.email},
                attributes: ['id']
            })

            const candidate = await participant[0].createResult(
                {
                    appointmentId: appointment.id,
                    coachId: coach.id,
                    regionId: region.id,
                    educationEntityId: educationEntity.id,
                    discipline: req.body.discipline,
                    completed: req.body.completed,
                    userId: user.id
                }
            );

            const result = await Result.scope('getFullResults').findOne({
                where: {id: candidate.id}
            })
            res.status(200).json({
                result,
                message: 'Вітаємо! Учасник успішно доданий до заявки!'
            });
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async updateResult(req, res) {
        try {
            const DoB = new Date(req.body.participant.DoB);
            const participantCandidate = await Participant.findOne({
                where: {
                    name: req.body.participant.name,
                    surname: req.body.participant.surname,
                    fathersName: req.body.participant.fathersName,
                    DoB,
                    gender: req.body.participant.gender,
                    schoolchildOrStudent: req.body.participant.schoolchildOrStudent
                }
            })
            if (participantCandidate) {
                await Result.update({
                    participantId: participantCandidate.id
                }, {
                    where: {
                        id: req.body.id
                    }
                });
            } else {
                await Participant.update(
                    {
                        name: req.body.participant.name,
                        surname: req.body.participant.surname,
                        fathersName: req.body.participant.fathersName,
                        DoB,
                        gender: req.body.participant.gender,
                        schoolchildOrStudent: req.body.participant.schoolchildOrStudent
                    }, {
                        where: {id: req.body.participant.id}
                    }
                );
            }

            const coachCandidate = await Coach.findOne({
                where: {
                    name: req.body.coach.name,
                    surname: req.body.coach.surname,
                    fathersName: req.body.coach.fathersName
                }
            });
            if (coachCandidate) {
                await Result.update({
                        coachId: coachCandidate.id
                    },
                    {
                        where: {id: req.body.id}
                    });
            } else {
                await Coach.update(
                    {
                        name: req.body.coach.name,
                        surname: req.body.coach.surname,
                        fathersName: req.body.coach.fathersName
                    }, {
                        where: {
                            id: req.body.coach.id
                        }
                    }
                );
            }

            const appointment = await Appointment.findOne(
                {
                    where:
                        {title: req.body.appointment.title}
                });

            const educationEntity = await EducationEntity.findOne({
                    where: {
                        name: req.body.educationEntity.name
                    }
                }
            );

            const region = await Region.findOne(
                {
                    where:
                        {regionName: req.body.region.regionName}
                }
            );

            const user = await User.findOne({
                where: {email: req.user.email},
                attributes: ['id']
            })
            const resultCandidate = await Result.findOne({
                where: {id: req.body.id}
            })
            let completed = req.body.completed;
            if (resultCandidate) {
                completed = resultCandidate.completed;
            }
            await Result.update(
                {
                    appointmentId: appointment.id,
                    regionId: region.id,
                    educationEntityId: educationEntity.id,
                    discipline: req.body.discipline,
                    place: req.body.place,
                    completed,
                    userId: user.id
                }, {
                    where: {id: req.body.id}
                }
            );
            const result = await Result.scope('getFullResults').findOne({
                where: {id: req.body.id}
            });
            res.status(200).json({
                result,
                message: 'Вітаємо! Ваші зміни успішно збережені!'
            });
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getAllResults(req, res) {
        try {
            let results = await Result.scope('getFullResults').findAll();
            if (req.query.direction) {
                results = results.filter(result => result.appointment.direction === req.query.direction);
            }
            if (req.query.participants) {
                results = results.filter(result => result.appointment.participants === req.query.participants);
            }
            if (req.query.gender) {
                results = results.filter(result => result.appointment.gender === req.query.gender);
            }
            if (req.query.regionGroup) {
                results = results.filter(result => result.appointment.regionGroup === req.query.regionGroup);
            }
            if (req.query.eduEntityType) {
                results = results.filter(result => result.appointment.eduEntityType === req.query.eduEntityType);
            }
            const category = Number(req.query.category);
            if (category !== 0) {
                results = results.filter(result => result.appointment.category === req.query.category);
            }
            results.map(
                result => {
                    result.ratingPoints = ResultService.getPointsByPlace(result)
                }
            );
            res.status(201).json(results);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getResultsByAppointment(req, res) {
        try {
            let resultsOrAppointment;
            let results = await Result.scope('getFullResults').findAll(
                {
                    where: {appointmentId: req.params.id},
                    order: [
                        ['discipline', 'ASC']
                    ]
                }
            );
            if (req.query.allOrOneManager === 'true') {
                results = results.filter(
                    result => result.user.email === req.user.email
                );
            }
            if (req.query.discipline) {
                results = results.filter(
                    result => result.discipline === req.query.discipline
                );
            }
            if (results.length === 0) {
                resultsOrAppointment = await Appointment.scope('fullAppointment').findOne(
                    {
                        where: {
                            id: req.params.id
                        }
                    }
                );
            } else {
                resultsOrAppointment = results;
            }
            res.status(201).json(resultsOrAppointment);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getResultsByActivity(req, res) {
        try {

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getResultsByKindOfStudents(req, res) {
        try {

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getResultsByDate(req, res) {
        try {

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getResultsByUserId(req, res) {
        try {

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getOneResultById(req, res) {
        try {

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async deleteResult(req, res) {
        try {
            await Result.destroy({
                where: {id: req.params.id}
            })
            res.status(201).json({
                message: 'Результати видалені з бази даних'
            })
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }
}

module.exports = new Result_controller()
