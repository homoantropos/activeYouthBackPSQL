const Sport_kind = require('../models/Sport_kind');

class Sports_kind_controller {

    async createSportKind(req, res) {
        try {
            const sport_kind = await Sport_kind.create({
                sport_kind: req.body.sport_kind,
                program: req.body.program,
                registration_number: req.body.registration_number
            });
            res.status(201).json(sport_kind);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async updateSportKind(req, res) {
        try {
            const sport_kind = await Sport_kind.update({
                sport_kind: req.body.sport_kind,
                program: req.body.program,
                registration_number: req.body.registration_number
            }, {
                where: {id: req.body.id}
            });
            res.stat(200).json(sport_kind);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getAllSportKinds(req, res) {
        try {
            const sport_kinds = await Sport_kind.findAll({
                order: [
                    ['sport_kind', 'ASC']
                ]
            });
            res.status(200).json(sport_kinds);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getOneSportKindById(req, res) {
        try {
            const sport_kind = await Sport_kind.findOne({
                where: {id: req.params.id}
            });
            res.status(200).json(sport_kind);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async deleteSportKind(req, res) {
        try {
            await Sport_kind.destroy({
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

module.exports = new Sports_kind_controller()
