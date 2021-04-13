const db = require('../db');

class Sports_kind_controller {

    async createSportKind(req, res) {
        try {
            const sportKind = await db.query(`INSERT INTO sportKind (name) values ($1) RETURNING _id, name`,
                [req.body.name]);
            res.status(201).json(sportKind.rows[0]);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async updateSportKind(req, res) {
        try {

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getAllSportKinds(req, res) {
        try {
            const sportKind = await db.query(`SELECT _id, name FROM sportKind ORDER BY name`);
            res.status(200).json(sportKind.rows);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getOneSportKindById(req, res) {
        try {

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async deleteSportKind(req, res) {
        try {
            const id = req.params.id;
            await db.query(`DELETE FROM sportKind where _id = ($1)`, [id]);
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
