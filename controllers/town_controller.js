const db = require('../db');

class Town_controller {

    async createTown(req, res) {
        try {
            const country = await db.query(`
                                SELECT
                                    country_id
                                FROM
                                    country
                                WHERE
                                    country.country_name = ($1)`,
                                [req.body.country]);
            const region = await db.query(`
                                SELECT
                                    region_id
                                FROM
                                    region
                                WHERE
                                    region_name = ($1)`,
                                [req.body.region]);
            const town = await db.query(`
                                INSERT INTO
                                    town
                                        (town_name,
                                         countryId,
                                         regionId)
                                VALUES
                                    ($1,
                                     $2,
                                     $3)
                                RETURNING
                                    town_id,
                                    town_name,
                                    countryId,
                                    regionId`,
                                [req.body.town_name,
                                 country.rows[0].country_id,
                                 region.rows[0].region_id]);
            res.status(201).json(town.rows[0]);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async updateTown(req, res) {
        try {
            const town = await db.query(`
                                UPDATE
                                    town
                                SET
                                    town_name = $1
                                WHERE
                                    town_id = $2
                                RETURNING
                                    town_id,
                                    town_name,
                                    countryId,
                                    regionId`,
                                [req.body.town_name,
                                 req.body.town_id]);
            res.status(200).json(town.rows[0]);
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
                                country_name,
                                region_name
                            FROM
                                town
                            INNER JOIN country
                                ON countryId = country_id
                            INNER JOIN region
                                ON regionId = region_id    
                            ORDER BY town_name`);
            res.status(200).json(towns.rows);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getTownsByCountry(req, res) {
        try {
            const country_id = await db.query(`
                            SELECT
                                country_id
                            FROM
                                country
                            WHERE
                                country_name = ($1)`,
                            [req.body.country_name]);
            const towns = await db.query(`
                            SELECT
                                town_id,
                                town_name,
                                countryId,
                                regionId
                            FROM
                                town
                            WHERE
                                countryId = ($1)`,
                            [country_id]);
            res.status(200).json(towns.rows[0]);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getTownsByRegion(req, res) {
        try {
            const region_id = await db.query(`
                            SELECT
                                region_id
                            FROM
                                region
                            WHERE
                                region_name = ($1)`,
                            [req.body.region]);
            const towns = await db.query(`
                            SELECT
                                town_id,
                                town_name,
                                countryId,
                                regionId
                            FROM
                                town
                            WHERE
                                regionId = ($1)`,
                            [region_id]);
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
            const town = await db.query(`
                            SELECT
                                town_id,
                                town_name,
                                country_name,
                                region_name
                            FROM town
                            INNER JOIN country
                                ON countryId = country_id
                            INNER JOIN region
                                ON regionId = region_id
                            WHERE town_id = ($1)`, [town_id]);
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
            await db.query(`
                            DELETE FROM
                                town
                            WHERE
                                town_id = ($1)`,
                            [id]);
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
