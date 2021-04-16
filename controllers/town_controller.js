const db = require('../db');

class Town_controller {

    async createTown(req, res) {
        try {
            const country = await db.query(`SELECT _id FROM country where country.name = ($1)`, [req.body.country]);
            console.log(country);
            const region = await db.query(`SELECT region_id FROM region WHERE region_name = ($1)`, [req.body.region]);
            console.log(region.rows[0]);
            const town = await db.query(`
INSERT INTO town (town_name, countryId, regionId) values ($1, $2, $3) RETURNING town_id, town_name, countryId, regionId`,
                [req.body.name, country.rows[0]._id, region.rows[0].region_id]);
            console.log(town);
            res.status(201).json(town.rows[0]);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async updateTown(req, res) {
        try {
            const town = await db.query(
                `UPDATE town set town_name = $1, where town_id = $2 RETURNING town_id, town_name, countryId, regionId`,
                [req.body.name, req.body._id]);
            res.stat(200).json(town.rows[0]);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getAllTowns(req, res) {
        try {
            const towns = await db.query(`
                            SELECT
                                town_id,
                                town_name,
                                name,
                                region_name
                            FROM
                                town
                            INNER JOIN country
                                ON countryId = _id
                            INNER JOIN region
                                ON regionId = region_id    
                            ORDER BY town_name`);
            console.log(towns.rows);
            res.status(200).json(towns.rows);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getTownsByCountry(req, res) {
        try {
            const country_id = await db.query(`SELECT _id FROM country where name = ($1)`, [req.body.country]);
            const towns = await db.query(`SELECT town_id, town_name, countryId, regionId FROM town where countryId = ($1)`, [country_id]);
            res.status(200).json(towns.rows[0]);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getTownsByRegion(req, res) {
        try {
            const region_id = await db.query(`SELECT region_id FROM region where region_name = ($1)`, [req.body.region]);
            const towns = await db.query(`SELECT town_id, town_name, countryId, regionId FROM town where regionId = ($1)`, [region_id]);
            res.status(200).json(towns.rows[0]);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getOneTownById(req, res) {
        try {
            const town_id = req.params.id;
            const town = await db.query(`SELECT town_id, town_name, countryId, regionId FROM town where town_id = ($1)`, [town_id]);
            res.status(200).json(town.rows[0]);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async deleteTown(req, res) {
        try {
            const id = req.params.id;
            await db.query(`DELETE FROM town where town_id = ($1)`, [id]);
            res.status(200).json({
                message: `Назву міста успішно видалено з бази даних.`
            });
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }
}

module.exports = new Town_controller()
