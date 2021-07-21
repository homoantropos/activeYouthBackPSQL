const Result = require('../models/Result');
const Appointment = require('../models/Appointment');
const Participant = require('../models/Participant');
const Coach = require('../models/Coach');
const coaches_service = require('../controllers/services/coaches_service');
const Region = require('../models/Region');
const EducationEntity = require('../models/EducationEntity');
const User = require('../models/User');

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
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async updateResult(req, res) {
        try {
            const DoB = new Date(req.body.participant.DoB);

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

            const participant = await Participant.findOne({
                where: {id: req.body.participant.id}
            })

            const appointment = await Appointment.findOne(
                {
                    where:
                        {title: req.body.appointment.title}
                });

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

            const coach = await Coach.findOne({
                where: {
                    id: req.body.coach.id
                }
            })

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

            await Result.update(
                {
                    appointmentId: appointment.id,
                    participantId: participant.id,
                    coachId: coach.id,
                    regionId: region.id,
                    educationEntityId: educationEntity.id,
                    discipline: req.body.discipline,
                    completed: req.body.completed,
                    userId: user.id
                }, {
                    where: {id: req.body.id}
                }
            );
            const result = await Result.scope('getFullResults').findOne({
                where: {id: req.body.id}
            });
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getAllResults(req, res) {
        try {
            const results = await Result.scope('getFullResults').findAll();
            res.status(201).json(results);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getResultsByAppointment(req, res) {
        try {
            let resp;
            let results = await Result.scope('getFullResults').findAll(
                {
                    where: {appointmentId: req.params.id}
                }
            );
            results = results.filter(
                result => result.user.email === req.user.email
            );
            if (results.length === 0) {
                resp = await Appointment.scope('fullAppointment').findOne(
                    {
                        where: {
                            id: req.params.id
                        }
                    }
                );
            } else {
                resp = results;
            }
            res.status(201).json(resp);
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
