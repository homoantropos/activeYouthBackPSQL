const Activity = require('../models/Activity');

class Activity_controller {

    async createActivity(req, res) {
        try {
            const activity = await Activity.create({
                title: req.body.title,
                author: req.body.author,
                content: req.body.content,
                kindOfActivity: req.body.kindOfActivity,
                userId: req.user.id
            });
            res.status(201).json(activity);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async updateActivity(req, res) {
        try {
            const activity = await Activity.update({
                title: req.body.title,
                author: req.body.author,
                content: req.body.content,
                kindOfActivity: req.body.kindOfActivity
            }, {
                where: {id: req.params.id}
            })
            res.status(200).json(activity);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getAllActivities(req, res) {
        try {
            const kindOfActivity = req.query.kindOfActivity;
            const activities = await Activity.findAll({
                where: {
                    kindOfActivity
                }
            });
            res.status(200).json(activities);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getAllActivitiesByUserId(req, res) {
        try {
            const activities = await Activity.findAll({
                where: {
                    userId: req.user.id
                }
            })
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getOneActivityById(req, res) {
        try {
            const activity = await Activity.findOne({
                where: {
                    id: req.params.id
                }
            });
            res.status(200).json(activity);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async deleteActivity(req, res) {
        try {
            await Activity.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.status(201).json({
                message: `Урок успішно видалено`
            });
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }
}

module.exports = new Activity_controller()
