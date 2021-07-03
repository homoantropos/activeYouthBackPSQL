const db = require('../database/db');
const sequelize = require('../database/sequelize');
const Result = require('../models/Result');
const Appointment = require('../models/Appointment');
const Participant = require('../models/Participant');
const Sequelize = require("sequelize");

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
                            gender: req.body.participant.DoB,
                            schoolchildOrStudent: req.body.participant.schoolchildOrStudent
                        }
                },
            )
            const appointment = await Appointment.findOne(
                {
                    where:
                        {title: req.body.appointment.title}
                });
            const result = await participant[0].createResult(
                {
                    appointmentId: appointment.id,
                    discipline: req.body.discipline,
                    place: req.body.place,
                    ratingPoints: req.body.ratingPoints,
                    completed: req.body.completed
                }
            );
            console.log('result: ', result);
            res.status(200).json(result);
        } catch (error) {
            console.log('error: ', error.message);
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async updateResult(req, res) {
        try {

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getAllResults(req, res) {
        try {

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

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }
}

module.exports = new Result_controller()
