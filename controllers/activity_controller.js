const db = require('../db');

class Activity_controller {

    async createActivity(req, res) {
        try {
            const activity = await db.query(`
                INSERT INTO activity (title, author, content, date, kindOfActivity, person_id)
                values ($1, $2, $3, $4, $5, $6) RETURNING *`,
                [req.body.title, req.body.author, req.body.content, req.body.date, req.body.kindOfActivity, req.user.rows[0]._id]
            );
            res.status(201).json(activity.rows[0]);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async updateActivity(req, res) {
        try {

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getAllActivities(req, res) {
        try {
            const kindOfActivity = req.query.kindOfActivity;
            const activities = await db.query(
                `SELECT * FROM activity where kindOfActivity = $1`, [kindOfActivity]
            );
            res.status(200).json(activities.rows);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getAllActivitiesByUserId(req, res) {
        try {

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getOneActivityById(req, res) {
        try {

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async deleteActivity(req, res) {
        try {

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }
}

module.exports = new Activity_controller()
