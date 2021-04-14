const db = require('../db');

class Country_controller {

    async createCountry(req, res) {
        try {
            const country = await db.query(`INSERT INTO country (name) values ($1) RETURNING _id, name`,
                [req.body.name]);
            res.status(201).json(country.rows[0]);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async updateCountry(req, res) {
        try {
            const country = await db.query(
                `UPDATE country set name = $1 where _id = $2 RETURNING name, _id`,
                [req.body.name, req.body._id]);
            res.stat(200).json(country.rows[0]);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getAllCountries(req, res) {
        try {
            const countries = await db.query(`SELECT _id, name FROM country ORDER BY name`);
            res.status(200).json(countries.rows);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getOneCountryById(req, res) {
        try {
            const id = req.params.id;
            const country = await db.query(`SELECT _id, name FROM country where _id = ($1)`, [id]);
            res.status(200).json(country.rows[0]);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async deleteCountry(req, res) {
        try {
            const id = req.params.id;
            await db.query(`DELETE FROM country where _id = ($1)`, [id]);
            res.status(200).json({
                message: `Назву країни успішно видалено з бази даних.`
            });
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }
}

module.exports = new Country_controller()
