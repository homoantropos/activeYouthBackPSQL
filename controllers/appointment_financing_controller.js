const AppointmentFinancing = require('../models/AppointmentFinancing')


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
            const expenses = await AppointmentFinancing.scope('getFullAppointmentFinancing').findAll();
            res.status(201).json({
                expenses
            })
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
