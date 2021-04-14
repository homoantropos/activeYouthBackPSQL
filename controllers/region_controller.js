const db = require('../db');

class Region_controller {

    async createRegion(req, res) {
        try {
            const region = await db.query(`INSERT INTO region (name, regionsgroup) values ($1, $2) RETURNING _id, name, regionsgroup`,
                [req.body.name, req.body.regionsgroup]);
            res.status(201).json(region.rows[0]);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async updateRegion(req, res) {
        try {
            const region = await db.query(
                `UPDATE region set name = $1, regionsgroup = $2 where _id = $3 RETURNING name, regionsgroup, _id`,
                [req.body.name, req.body.regionsgroup, req.body._id]);
            res.stat(200).json(region.rows[0]);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getAllRegions(req, res) {
        try {
            const regions = await db.query(`SELECT _id, name, regionsgroup FROM region ORDER BY name`);
            res.status(200).json(regions.rows);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getRegionsByGroup(req, res) {
        try {
            const group = req.params.regionsgroup;
            const regions = await db.query(`SELECT _id, name, regionsGroup FROM region where regionsgroup = ($1)`, [group]);
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
            const regions = await db.query(`SELECT _id, name, regionsgroup FROM region where _id = ($1)`, [id]);
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
            await db.query(`DELETE FROM region where _id = ($1)`, [id]);
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
