const db = require('../db');

class Activity_controller {

    async createActivity(req, res) {
        try {
            const activity = await db.query(`
                INSERT INTO activity (title, author, content, date, kindOfActivity, person_id)
                values ($1, $2, $3, $4, $5, $6) RETURNING *`,
                [req.body.title, req.body.author, req.body.content, req.body.date, req.body.kindOfActivity, req.user.rows[0].person_id]
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
            const activity_id = req.params.id;
            const activity = await db.query(`
                UPDATE activity set title = $1, author = $2, content = $3, kindOfActivity = $4 where activity_id = $5
                RETURNING title, author, content, kindOfActivity, activity_id`,
                [req.body.title, req.body.author, req.body.content, req.body.kindOfActivity, activity_id]
            );
            res.status(200).json(activity.rows[0]);
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
            const activity_id = req.params.id;
            const activity = await db.query(`SELECT title, author, content, date, kindOfActivity, person_id FROM activity where activity_id = ($1)`, [activity_id]);
            res.status(200).json(activity.rows[0]);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async deleteActivity(req, res) {
        try {
            const id = req.params.id;
            await db.query(`DELETE FROM activity where activity_id = ($1)`, [id]);
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
