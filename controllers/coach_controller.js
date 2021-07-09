const Coach = require('../models/Coach');
const coaches_service = require("../controllers/services/coaches_service");

class Coach_controller {

    async createCoach(req, res) {
        try {
            const coach = await coaches_service.getCoachFromDB(req.body);
            res.status(200).json(coach);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async updateCoach(req, res) {
        try {

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getAllCoaches(req, res) {
        try {
            const coaches = await Coach.findAll({
                order: [
                    ['surname', 'ASC']
                ]
            });
            res.status(201).json(coaches);

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getCoachesByActivity(req, res) {
        try {

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getCoachesByUserId(req, res) {
        try {

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getOneCoachById(req, res) {
        try {

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async deleteCoach(req, res) {
        try {

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }
}

module.exports = new Coach_controller()
