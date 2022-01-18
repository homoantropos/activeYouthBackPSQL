const AppointmentFinancing = require('../models/AppointmentFinancing');


class Appointment_financing_controller {

    async updateAppointmentFinancing(req, res) {
        try {

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getAllAppointmentsFinancing(req, res) {
        try {
            let expenses = await AppointmentFinancing.scope('getFullAppointmentFinancing').findAll();
            if (req.query.direction) {
                expenses = expenses.filter(exp => exp.appointment.direction === req.query.direction);
            }
            if (req.query.participants) {
                expenses = expenses.filter(exp => exp.appointment.participants === req.query.participants);
            }
            if (req.query.organiser) {
                expenses = expenses.filter(exp => exp.appointment.organiser === req.query.organiser);
            }
            if (req.query.years) {
                const year = Number(req.query.years);
                if (year !== 0) {
                    expenses = expenses.filter(exp => exp.appointment.start.getFullYear() === year);
                }
            }
            expenses.map(
                exp => {
                    exp.totalplan = exp.kekv2210plan + exp.kekv2220plan + exp.kekv2240plan;
                    exp.totalfact = exp.kekv2210fact + exp.kekv2220fact + exp.kekv2240fact;
                }
            );
            res.status(201).json(expenses);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getAppointmentsFinancingByActivity(req, res) {
        try {

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getAppointmentsFinancingByDate(req, res) {
        try {

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getAppointmentsFinancingByUserId(req, res) {
        try {

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getOneAppointmentFinancingById(req, res) {
        try {

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async deleteAppointmentFinancing(req, res) {
        try {

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }
}

module.exports = new Appointment_financing_controller()
