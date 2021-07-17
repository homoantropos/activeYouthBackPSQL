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
                townName: req.body.townName,
                regionId: region.id
            });
            res.status(201).json({
                town,
                message: `${town.townName} успішно додано до бази даних.`});
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
                townName: req.body.townName,
                regionId: region.id
            }, {
                where: {id: req.body.id}
            });

            const town = await Town.scope('getFullTown').findOne({
                where: {id: req.body.id}
            })
            res.status(201).json({
                town,
                message: 'Зміни успішно збережені.',
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
                    ['townName', 'ASC']
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
                        ['townName', 'ASC']
                    ]
                }
            )
            res.status(200).json({
                message: `Назву міста успішно видалено з бази даних.`,
                towns
            });
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }
}

module.exports = new Town_controller()
