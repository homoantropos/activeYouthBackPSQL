const Coach = require('../models/Coach');
const Result = require('../models/Result');
const coaches_service = require("../controllers/services/coaches_service");

class Coach_controller {

    async createCoach(req, res) {
        try {
            const coach = await coaches_service.getCoachFromDB(req.body);
            res.status(200).json({
                    coach,
                    message: `
               ${coach.surname} ${coach.name} ${coach.fathersName}
                успішно доданий(а) до бази тренерів.
                `
                }
            )
            ;
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async updateCoach(req, res) {
        try {
            await Coach.update({
                name: req.body.name,
                surname: req.body.surname,
                fathersName: req.body.fathersName
            }, {
                where: {id: req.body.id}
            });
            const coach = await Coach.findOne(
                {
                    where: {id: req.body.id}
                }
            );
            res.status(200).json({
                coach,
                message: 'Вітаємо! Ваші зміни збережено!'
            });

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
            const coach = await Coach.findOne({
                where: {id: req.params.id}
            })
            res.status(200).json(coach)
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async deleteCoach(req, res) {
        try {
            const candidate = await Result.findAll({
                where: {
                    coachId: req.params.id
                }
            });
            if (candidate.length > 0) {
                res.status(404).json({
                    message: 'Тренер звязаний з базою результатів і не може бути видалений з бази даних.'
                });
            } else {
                await Coach.destroy({
                    where: {id: req.params.id}
                });
                const coaches = await Coach.findAll({
                    order: [
                        ['surname', 'ASC']
                    ]
                });
                res.status(200).json({
                    coaches,
                    message: 'Тренера успішно видалено з бази даних'
                })
            }
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }
}

module.exports = new Coach_controller()
