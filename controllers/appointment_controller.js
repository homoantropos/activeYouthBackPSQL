const db = require('../database/db');
const Appointment = require('../models/Appointment');
const Appointment_place = require('../models/Appointment_place');
const Sport_kind = require('../models/Sport_kind');
const User = require('../models/User');
const Report = require('../models/Report');
const reportServise = require('./services/report_service');

class Appointment_controller {

    async createAppointment(req, res) {
        try {
            const appointmentPlace = await Appointment_place.scope('appointmentPlace').findOne({
                where: {appointment_place_name: req.body.place.appointment_place_name}
            });
            const sport_kind = await Sport_kind.findOne({
                where: {sport_kind: req.body.sport_kind},
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
                appointmentPlaceId: appointmentPlace.id,
                organizationsParticipants: req.body.organizationsParticipants,
                kpkv: req.body.kpkv,
                haracter: req.body.character,
                participants: req.body.participants,
                direction: req.body.direction,
                status: req.body.status,
                organiser: req.body.organiser,
                sportKindId: sport_kind.id,
                userId: user.id
            });

            const total_plan = reportServise.total_counter(req);
            console.log(total_plan);
            const person_per_day_plan = total_plan * appointment.duration;

            const report = await appointment.createReport({
                countries_plan: req.body.members.countries,
                regions_plan: req.body.members.regions,
                educationEntity_plan: req.body.members.educationEntity,
                sportsmen_plan: req.body.members.sportsmen,
                coaches_plan: req.body.members.coaches,
                referees_plan: req.body.members.referees,
                others_plan: req.body.members.others,
                total_plan,
                person_per_day_plan
            });

            console.log(report);
            res.status(201).json({appointment, report});
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async updateAppointment(req, res) {
        try {
            const appointmentPlace = await Appointment_place.scope('appointmentPlace').findOne({
                where: {appointment_place_name: req.body.place.appointment_place_name}
            });
            const sport_kind = await Sport_kind.findOne({
                where: {sport_kind: req.body.sport_kind},
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
                sportKindId: sport_kind.id,
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
            const appointments = await Appointment.scope('fullAppointment').findAll();
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
            console.log(calendar);
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
