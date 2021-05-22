const Region = require('../models/Region');
const Educational_entity = require('../models/Educational_entity');

class Educational_entity_controller {

    async createEducationalEntity(req, res) {
        try {
            const region = await Region.findOne({
                where: {region_name: req.body.region_name}
            });
            console.log(region);
            const educational_entity = await region.createEducational_entity({
                name: req.body.name,
                eduEntityType: req.body.eduEntityType,
                category: req.body.category
            });
            res.status(200).json(educational_entity);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async updateEducationalEntity(req, res) {
        try {
            const region = await Region.findOne({
                where: {
                    region_name: req.body.region_name
                }
            })
            await Educational_entity.update({
                name: req.body.name,
                category: req.body.category,
                regionId: region.id
            }, {
                where: {
                    id: req.params.id
                }
            });
            res.status(201).json({
                message: 'Ваші зміни успішно збережені.'
            });
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getAllEducationalEntities(req, res) {
        try {
            const eduEntities = await Educational_entity.scope('getFullEduEntity').findAll();
            res.status(201).json(eduEntities);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getEducationalEntitiesByCategory(req, res) {
        try {

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getEducationalEntitiesByType(req, res) {
        try {

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getOneEducationalEntityById(req, res) {
        try {

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async deleteEducationalEntity(req, res) {
        try {

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }
}

module.exports = new Educational_entity_controller()
