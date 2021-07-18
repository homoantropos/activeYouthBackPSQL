const Country = require('../models/Country');

class Country_controller {

    async createCountry(req, res) {
        try {
            const country = await Country.create({
                countryName: req.body.countryName
            });
            res.status(201).json(country);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async updateCountry(req, res) {
        try {
            const country = await Country.update({
                countryName: req.body.countryName
            }, {
                where: {id: req.body.id}
            });
            res.status(200).json({
                message: 'Зміни успішно збережені.'
            });
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getAllCountries(req, res) {
        try {
            const countries = await Country.findAll({
                order: [
                    ['countryName', 'ASC']
                ]
            });
            res.status(200).json(countries);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getOneCountryById(req, res) {
        try {
            const country = await Country.findOne({
                where: {
                    id: req.params.id
                }
            });
            res.status(200).json(country);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async deleteCountry(req, res) {
        try {
            await Country.destroy({
                where: {
                    id: req.params.id
                }
            });
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
