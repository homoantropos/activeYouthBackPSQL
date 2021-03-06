const sequelize = require('../database/sequelize');
const Region = require('../models/Region');
const Country = require('../models/Country');

class Region_controller {

    async createRegion(req, res) {
        try {
            const country = await Country.findOne({
                where: {
                    countryName: req.body.country.countryName
                }
            });
            const candidate = await country.createRegion({
                regionName: req.body.regionName,
                regionGroup: req.body.regionGroup,
                countryId: country.id
            });
            const region = await Region.scope('getFullRegion').findOne({
                where: {id: candidate.id}
            })
            res.status(201).json({
                region,
                message: `${region.regionName} успішно додано до бази даних!`
            });
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async updateRegion(req, res) {
        try {
            await Region.update({
                regionName: req.body.regionName,
                regionGroup: req.body.regionGroup,
                countryId: req.body.countryId
            }, {
                where: {id: req.body.id}
            })
            const region = await Region.scope('getFullRegion').findOne({
                where: {
                    id: req.body.id
                }
            })
            res.status(200).json({
                region,
                message: "Зміни успішно збережені."
            });
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
                        ['regionName', 'ASC']
                    ]
                });
                res.status(200).json(regions);
            } else {
                const regions = await Region.findAll({
                    order: [
                        ['regionName', 'ASC']
                    ],
                    include: {
                        model: Country,
                        attributes: {exclude: ['id']}
                    }
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
            const region = await Region.scope('getFullRegion').findOne({
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
