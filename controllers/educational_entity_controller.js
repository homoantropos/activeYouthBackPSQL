const Region = require('../models/Region');
const EducationEntity = require('../models/EducationEntity');

class EducationEntity_controller {

    async createEducationEntity(req, res) {
        try {
            const region = await Region.findOne({
                where: {regionName: req.body.region.regionName}
            });
            const candidate = await region.createEducationEntity({
                name: req.body.name,
                eduEntityType: req.body.eduEntityType,
                category: req.body.category
            });
            const educationEntity = await EducationEntity.scope('getFullEduEntity').findOne({
                where: {id: candidate.id}
            })
            res.status(200).json({
                educationEntity,
                message: `${educationEntity.name} успішно додано до бази даних`
            });
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
                    regionName: req.body.region.regionName
                }
            })
            await EducationEntity.update({
                name: req.body.name,
                category: req.body.category,
                eduEntityType: req.body.eduEntityType,
                regionId: region.id
            }, {
                where: {
                    id: req.params.id
                }
            });
            const educationEntity = await EducationEntity.scope('getFullEduEntity').findOne({
                where: {id: req.params.id}
            })
            res.status(201).json({
                educationEntity,
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
            let eduEntities = await EducationEntity.scope('getFullEduEntity').findAll(
                {
                    order: [
                        ['name', 'ASC']
                    ]
                });
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
            }
            res.status(201).json({eduEntities, eduEntityNames, message});
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getEducationalEntitiesNamesByRegion(req, res) {
        try {
            let eduEntities = await EducationEntity.scope('getFullEduEntity').findAll();
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
            const eduEntity = await EducationEntity.scope('getFullEduEntity').findOne({
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
            await EducationEntity.destroy({
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
