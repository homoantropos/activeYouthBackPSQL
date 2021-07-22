const Region = require('../models/Region');
const Educational_entity = require('../models/EducationEntity');

class EducationEntity_controller {

    async createEducationEntity(req, res) {
        try {
            const region = await Region.findOne({
                where: {regionName: req.body.regionName}
            });
            const educationEntity = await region.createEducationEntity({
                name: req.body.name,
                eduEntityType: req.body.eduEntityType,
                category: req.body.category
            });
            res.status(200).json(educationEntity);
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
                    regionName: req.body.regionName
                }
            })
            await Educational_entity.update({
                name: req.body.name,
                category: req.body.category,
                eduEntityType: req.body.eduEntityType,
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
            let eduEntities = await Educational_entity.scope('getFullEduEntity').findAll();
            let message = ''
            const eduEntityNames = [];
            if (req.query.eduEntityType) {
                eduEntities = eduEntities.filter(eduEntity => eduEntity.eduEntityType === req.query.eduEntityType);
            }
            if (req.query.category) {
                eduEntities = eduEntities.filter(eduEntity => eduEntity.category === req.query.category);
            }
            if (req.query.regionName) {
                eduEntities = eduEntities.filter(eduEntity => eduEntity.region.regionName === req.query.regionName);
                eduEntities.map(
                    eduEntity => eduEntityNames.push(eduEntity.name)
                )
            }
            if (eduEntities.length === 0) {
                message = 'Навчальних закладів за такими умовами в базі даних не існує'
            } else {
                res.status(201).json({eduEntities, eduEntityNames, message});
            }
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getEducationalEntitiesNamesByRegion(req, res) {
        try {
            let eduEntities = await Educational_entity.scope('getFullEduEntity').findAll();
            const eduEntityNames = [];
            if (req.query.regionName) {
                eduEntities = eduEntities.filter(eduEntity => eduEntity.region.regionName === req.query.regionName);
                eduEntities.map(
                    eduEntity => eduEntityNames.push(eduEntity.name)
                )
            }
            if (eduEntities.length === 0) {
                res.status(404).json({
                    message: 'Навчальних закладів за такими умовами в базі даних не існує'
                });
            } else {
                res.status(201).json(eduEntityNames);
            }
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getOneEducationalEntityById(req, res) {
        try {
            const eduEntity = await Educational_entity.scope('getFullEduEntity').findOne({
                where: {id: req.params.id}
            });
            if (eduEntity) {
                res.status(200).json(eduEntity);
            } else {
                res.status(404).json({
                    message: 'Навчального закладу з таким id в базі даних не існує'
                })
            }
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async deleteEducationalEntity(req, res) {
        try {
            await Educational_entity.destroy({
                where: {id: req.params.id}
            });
            res.status(200).json({
                message: 'Навчальний заклад успішно видалено з бази даних!'
            })
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }
}

module.exports = new EducationEntity_controller()
