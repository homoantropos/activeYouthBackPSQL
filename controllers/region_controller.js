const db = require('../database/db');
const Region = require('../models/Region');
const Country = require('../models/Country');

class Region_controller {

    async createRegion(req, res) {
        try {
            const country = await Country.findOne({
                where: {
                    country_name: req.body.country
                }
            });
            const region = await country.createRegion({
                region_name: req.body.region_name,
                region_group: req.body.region_group,
                countryId: country.id
            });
            console.log(region);
            res.status(201).json(region);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async updateRegion(req, res) {
        try {
            const region = Region.update({
                region_name: req.body.region_name,
                region_group: req.body.region_group,
                countryId: req.body.countryId
            }, {
                where: {id: req.body.id}
            })
            res.status(200).json(region);
            console.log(region);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getAllRegions(req, res) {
        try {
            if (req.query.regionGroup) {
                const regions = await Region.findAll({
                    where: {
                        region_group: req.query.regionGroup
                    },
                    order: [
                        ['region_name', 'ASC']
                    ]
                });
                res.status(200).json(regions);
            } else {
                const regions = await Region.findAll({
                    order: [
                        ['region_name', 'ASC']
                    ]
                });
                res.status(200).json(regions);
            }
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getOneRegionById(req, res) {
        try {
            const region = await Region.findOne({
                where: {id: req.params.id}
            })
            res.status(200).json(region);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async deleteRegion(req, res) {
        try {
            await Region.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.status(200).json({
                message: `Регіон успішно видалено з бази даних.`
            });
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }
}

module.exports = new Region_controller()
