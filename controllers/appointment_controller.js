const Appointment = require('../models/Appointment');
const AppointmentPlace = require('../models/AppointmentPlace');
const SportKind = require('../models/SportKind');
const User = require('../models/User');
const Report = require('../models/Report');
const AppointmentFinancing = require('../models/AppointmentFinancing')
const reportService = require('./services/report_service');

class Appointment_controller {

    async createAppointment(req, res) {
        try {
            const appointmentPlace = await AppointmentPlace.scope('appointmentPlace').findOne({
                where: {appointmentPlaceName: req.body.place.appointmentPlaceName}
            });
            const sportKind = await SportKind.findOne({
                where: {sportKind: req.body.sportKind},
                attributes: ['id']
            });
            const user = await User.findOne({
                where: {email: req.user.email},
                attributes: ['id'],
            })
            const start = new Date(req.body.start);
            const finish = new Date(req.body.finish);
            const appointment = await appointmentPlace.createAppointment({
                title: req.body.title,
                start,
                finish,
                duration: req.body.duration,
                logoSrc: req.file ? req.file.path : '',
                appointmentPlaceId: appointmentPlace.id,
                organizationsParticipants: req.body.organizationsParticipants,
                kpkv: req.body.kpkv,
                haracter: req.body.character,
                participants: req.body.participants,
                direction: req.body.direction,
                status: req.body.status,
                organiser: req.body.organiser,
                sportKindId: sportKind.id,
                userId: user.id
            });

            const totalPlan = reportService.totalCounter(req);
            const personPerDayPlan = totalPlan * appointment.duration;

            const report = await appointment.createReport({
                countriesPlan: req.body.members.countries,
                regionsPlan: req.body.members.regions,
                educationEntityPlan: req.body.members.educationEntity,
                sportsmenPlan: req.body.members.sportsmen,
                coachesPlan: req.body.members.coaches,
                refereesPlan: req.body.members.referees,
                othersPlan: req.body.members.others,
                countriesFact: 0,
                regionsFact: 0,
                educationEntityFact: 0,
                sportsmenFact: 0,
                coachesFact: 0,
                refereesFact: 0,
                othersFact: 0,
                totalPlan,
                personPerDayPlan
            });
            const expenses = await AppointmentFinancing.create({
                appointmentId: appointment.id,
                kekv2210plan: 0,
                kekv2220plan: 0,
                kekv2240plan: 0,
                kekv2210fact: 0,
                kekv2220fact: 0,
                kekv2240fact: 0
            });
            res.status(201).json({appointment, report, expenses});
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async updateAppointment(req, res) {
        try {
            const appointmentPlace = await AppointmentPlace.scope('appointmentPlace').findOne({
                where: {appointmentPlaceName: req.body.place.appointmentPlaceName}
            });
            const sportKind = await SportKind.findOne({
                where: {sportKind: req.body.sportKind},
                attributes: ['id']
            });
            const user = await User.findOne({
                where: {email: req.user.email},
                attributes: ['id'],
            })
            const start = new Date(req.body.start);
            const finish = new Date(req.body.finish);
            const appointment = await Appointment.update({
                title: req.body.title,
                start,
                finish,
                duration: req.body.duration,
                appointmentPlaceId: appointmentPlace.id,
                organizationsParticipants: req.body.organizationsParticipants,
                kpkv: req.body.kpkv,
                haracter: req.body.character,
                participants: req.body.participants,
                direction: req.body.direction,
                status: req.body.status,
                organiser: req.body.organiser,
                sportKindId: sportKind.id,
                userId: user.id
            }, {
                where: {id: req.body.appointment_id}
            });
            res.status(201).json(appointment);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getAllAppointments(req, res) {
        try {
            let appointments = await Appointment.scope('fullAppointment').findAll(
                {
                    order: [
                        ['start', 'ASC']
                    ]
                }
            );
            if (req.query.date) {
                let date = new Date(req.query.date);
                date.setDate(date.getDate() + 30);
                appointments = appointments.filter(appointment => appointment.start > req.query.date);
                appointments = appointments.filter(appointment => appointment.start <= date);
                appointments = appointments.sort('start', DSC)
            }
            res.status(200).json(appointments);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getCalendar(req, res) {
        try {
            const calendar = await Report.scope('fullReport').findAll();
            res.status(200).json(calendar);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getAppointmentsByActivity(req, res) {
        try {

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getAppointmentsByParticipantsType(req, res) {
        try {

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getAppointmentsByDate(req, res) {
        try {

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getAppointmentsByUserId(req, res) {
        try {

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getOneAppointmentById(req, res) {
        try {
            const appointment = await Appointment.scope('fullAppointment').findOne({
                where: {id: req.params.id}
            })
            res.status(200).json(appointment);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async deleteAppointment(req, res) {
        try {
            await Appointment.destroy({
                where: {id: req.params.id}
            })
            res.status(201).json({
                message: `Захід успішно видалено з бази даних.`
            });
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }
}

module.exports = new Appointment_controller()
