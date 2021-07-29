const SportKind = require('../models/SportKind');

class SportsKindController {

    async createSportKind(req, res) {
        try {
            const sportKind = await SportKind.create({
                sportKind: req.body.sportKind,
                program: req.body.program,
                registrationNumber: req.body.registrationNumber
            });
            res.status(201).json({
                sportKind,
                message: `${sportKind.sportKind} успішно додано до бази даних.`
            });
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async updateSportKind(req, res) {
        try {
            await SportKind.update({
                sportKind: req.body.sportKind,
                program: req.body.program,
                registrationNumber: req.body.registrationNumber
            }, {
                where: {id: req.body.id}
            });
            const sportKind = await SportKind.findOne({
                where: {
                    id: req.body.id
                }
            })
            res.status(200).json({
                sportKind,
                message: 'Зміни успішно збережені.'
            });
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getAllSportKinds(req, res) {
        try {
            const sportKinds = await SportKind.findAll({
                order: [
                    ['sportKind', 'ASC']
                ]
            });
            res.status(200).json(sportKinds);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getOneSportKindById(req, res) {
        try {
            const sportKind = await SportKind.findOne({
                where: {id: req.params.id}
            });
            res.status(200).json(sportKind);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async deleteSportKind(req, res) {
        try {
            await SportKind.destroy({
                where: {id: req.params.id}
            });
            res.status(200).json({
                message: `Вид спорту успішно видалено`
            });
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }
}

module.exports = new SportsKindController()
