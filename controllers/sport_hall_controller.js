const Country = require('../models/Country');
const Region = require('../models/Region');
const Town = require('../models/Town');
const Sport_hall = require('../models/Sport_hall');

class Sport_hall_controller {

    async createSportHall(req, res) {
        try {
            const town = await Town.findOne({
                where: {
                    town_name: req.body.town.town_name
                }
            });
            const sportHall = await Sport_hall.create({
                sport_hall_name: req.body.sport_hall_name,
                address: req.body.address,
                townId: town.id
            })
            res.status(201).json(sportHall);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async updateSportHall(req, res) {
        try {
            const town = await Town.findOne({
                where: {
                    town_name: req.body.town.town_name
                }
            });
            const sportHall = await Sport_hall.update({
                sport_hall_name: req.body.sport_hall_name,
                address: req.body.address,
                townId: town.id
            }, {
                where: {id: req.body.id}
            })
            res.status(201).json({
                message: 'Зміни успішно збережені.'
            });
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getAllSportHalls(req, res) {
        try {
            const sportHalls = await Sport_hall.findAll({
                include: [{model: Town, required: true}]
            });
            res.status(200).json(sportHalls);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getOneSportHallById(req, res) {
        try {
            const sportHall = await Sport_hall.findOne({
                where: {id: req.params.id},
                include: [{model: Town, required: true, include: [
                        {model: Country, required: true},
                        {model: Region, required: true}
                    ]}]
            });
            res.status(200).json(sportHall);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async deleteSportHall(req, res) {
        try {
            await Sport_hall.destroy({
                where: {id: req.params.id}
            })
            res.status(200).json({
                message: 'Спортивна споруда успішно видалена з абзи даних'
            })
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }
}

module.exports = new Sport_hall_controller()
