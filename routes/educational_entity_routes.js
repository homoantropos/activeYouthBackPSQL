const express = require('express');
const router = express.Router()
const controller = require('../controllers/educational_entity_controller');

router.post('/', controller.createEducationalEntity);
router.patch('/', controller.updateEducationalEntity);
router.get('/', controller.getAllEducationalEntities);
router.get('/:id', controller.getOneEducationalEntityById);
router.get('/:categoryId', controller.getEducationalEntitiesByCategory);
router.get('/:edyEntityType', controller.getEducationalEntitiesByType);
router.delete('/:id', controller.deleteEducationalEntity);

module.exports = router