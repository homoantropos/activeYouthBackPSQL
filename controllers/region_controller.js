const db = require('../database/db');

class Region_controller {

    async createRegion(req, res) {
        try {
            console.log(req.body);
            const country_id = await db.query(`
                                SELECT
                                    country_id
                                FROM
                                    country
                                WHERE
                                    country.country_name = ($1)`, [req.body.country]);
            const region = await db.query(`
                                INSERT INTO region
                                    (region_name,
                                     region_group,
                                     country_id)
                                VALUES
                                    ($1,
                                     $2,
                                     $3)
                                RETURNING
                                    region_id,
                                    region_name,
                                    region_group,
                                    country_id`,
                                [req.body.region_name,
                                 req.body.region_group,
                                 country_id.rows[0].country_id
                                ]);
            res.status(201).json(region.rows[0]);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async updateRegion(req, res) {
        try {
            const region = await db.query(`
                                UPDATE
                                    region
                                SET
                                    region_name = $1,
                                    region_group = $2
                                WHERE
                                    region_id = $3
                                RETURNING
                                    region_name,
                                    region_group,
                                    region_id`,
                                [req.body.region_name,
                                 req.body.region_group,
                                 req.body.region_id]);
            res.status(200).json(region.rows[0]);
            console.log(region.rows[0]);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getAllRegions(req, res) {
        try {
            const regions = await db.query(`
                                SELECT
                                    region_id,
                                    region_name,
                                    region_group,
                                    country_name
                                FROM
                                    region
                                INNER JOIN
                                    country
                                ON region.country_id = country.country_id
                                ORDER BY
                                    region_name`);
            res.status(200).json(regions.rows);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getRegionsByGroup(req, res) {
        try {
            const group = req.params.region_group;
            const regions = await db.query(`
                                SELECT
                                    region_id,
                                    region_name,
                                    region_group
                                FROM
                                    region
                                WHERE
                                    region_group = ($1)`,
                                [group]);
            res.status(200).json(regions.rows[0]);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getOneRegionById(req, res) {
        try {
            const id = req.params.id;
            const regions = await db.query(`
                                SELECT
                                    region_id,
                                    region_name,
                                    region_group
                                FROM
                                    region
                                WHERE
                                    region_id = ($1)`,
                                [id]);
            res.status(200).json(regions.rows[0]);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async deleteRegion(req, res) {
        try {
            const id = req.params.id;
            await db.query(`
                DELETE
                FROM
                    region
                WHERE
                    region_id = ($1)`,
                [id]);
            res.status(200).json({
                message: `Назву регіону успішно видалено з бази даних.`
            });
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }
}

module.exports = new Region_controller()
