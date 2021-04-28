const db = require('../database/db');

class Country_controller {

    async createCountry(req, res) {
        try {
            const country = await db.query(`INSERT INTO country (country_name) values ($1) RETURNING country_id, country_name`,
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
                `UPDATE country set country_name = $1 where country_id = $2 RETURNING country_name, country_id`,
                [req.body.name, req.body.country_id]);
            res.stat(200).json(country.rows[0]);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getAllCountries(req, res) {
        try {
            const countries = await db.query(`SELECT country_id, country_name FROM country ORDER BY country_name`);
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
            const country = await db.query(`SELECT country_id, country_name FROM country where country_id = ($1)`, [id]);
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
            await db.query(`DELETE FROM country where country_id = ($1)`, [id]);
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
