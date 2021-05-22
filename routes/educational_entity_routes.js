const express = require('express');
const router = express.Router()
const passport = require('../middleware/passport');
const controller = require('../controllers/educational_entity_controller');

router.post('/', controller.createEducationalEntity);
router.patch('/:id', controller.updateEducationalEntity);
router.get('/', controller.getAllEducationalEntities);
router.get('/:id', controller.getOneEducationalEntityById);
router.delete('/:id', controller.deleteEducationalEntity);

module.exports = router
