const db = require('../db');

class Sport_hall_controller {

    async createSportHall(req, res) {
        try {
            const town = await db.query(`SELECT town_id FROM town WHERE town_name = ($1)`, [req.body.town_name]);
            const sportHall = await db.query(`INSERT INTO sportHall (sportHall_name, address, town_id)
                                                VALUES ($1, $2, $3)
                                                RETURNING sportHall_id, sportHall_name, address, town_id`,
                                                [req.body.sportHall_name, req.body.address, town.rows[0].town_id]);
            res.status(201).json(sportHall.rows[0]);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async updateSportHall(req, res) {
        try {
            const sportHall = await db.query(`
                                    UPDATE
                                        sportHall
                                    SET
                                        sportHall_name = $1,
                                        address = $2
                                    WHERE
                                        sportHall_id = $3
                                    RETURNING
                                        sportHall_id,
                                        sportHall_name,
                                        address,
                                        town_id`,
                                    [req.body.sportHall_name,
                                     req.body.address,
                                     req.body.sportHall_id
                                    ]);
            res.status(200).json(sportHall.rows[0]);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getAllSportHalls(req, res) {
        try {
            const sportHalls = await db.query(`
                SELECT
                    sportHall_name,
                    address,
                    sportHall_id,
                    town_name
                FROM
                    sportHall
                INNER JOIN
                    town
                ON
                    sportHall.town_id = town.town_id
                ORDER BY
                     sportHall_name
                `);
            res.status(200).json(sportHalls.rows);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getOneSportHallById(req, res) {
        try {
            const sportHall = await db.query(`
                SELECT
                    sportHall_name,
                    address,
                    sportHall_id,
                    town_name
                FROM
                    sportHall
                INNER JOIN
                    town
                ON sportHall.town_id = town.town_id
                WHERE
                    sportHall_id = ($1)
            `,
            [req.params.id]);
            res.status(200).json(sportHall.rows[0]);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async deleteSportHall(req, res) {
        try {
            await db.query(`
                DELETE
                FROM
                    sportHall
                WHERE
                    sportHall_id = ($1)
            `, [req.params.id]);
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
