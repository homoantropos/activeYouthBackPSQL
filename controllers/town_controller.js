const Town = require('../models/Town');
const Region = require('../models/Region');
const Country = require('../models/Country');

class Town_controller {

    async createTown(req, res) {
        try {
            const region = await Region.findOne({
                    where: {region_name: req.body.region.region_name}
                }
            );
            const town = await region.createTown({
                town_name: req.body.town_name,
                regionId: region.id
            });
            res.status(201).json(town);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async updateTown(req, res) {
        try {
            const region = await Region.findOne({
                    where: {region_name: req.body.region.region_name}
                }
            );
            await Town.update({
                town_name: req.body.town_name,
                regionId: region.id
            }, {
                where: {id: req.body.id}
            });
            res.status(201).json({
                message: 'Зміни успішно збережені.'
            });
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getAllTowns(req, res) {
        try {
            const towns = await Town.findAll({
                include: [
                    {
                        model: Region,
                        attributes: {
                            exclude: ['countryId', 'id']
                        },
                        include: {
                            model: Country,
                            attributes: {
                                exclude: ['id']
                            }
                        }
                    }],
                attributes: {exclude: ['regionId']},
                order: [
                    ['town_name', 'ASC']
                ]
            });
            if (req.query.regionName) {
                towns.filter(town => town.region.region_name === regionName);
            }
            res.status(200).json(towns);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getOneTownById(req, res) {
        try {
            const town = await Town.findOne({
                    where: {id: req.params.id},
                    include: [
                        {
                            model: Region,
                            attributes: {
                                exclude: ['countryId', 'id']
                            },
                            include: {
                                model: Country,
                                attributes: {
                                    exclude: ['id']
                                }
                            }
                        }]
                }
            );
            res.status(200).json(town);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async deleteTown(req, res) {
        try {
            await Town.destroy({
                where: {id: req.params.id}
            });
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
