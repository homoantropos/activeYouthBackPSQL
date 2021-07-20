const express = require('express');
const router = express.Router()
const passport = require('passport');
const controller = require('../controllers/educational_entity_controller');

router.post('/', passport.authenticate('jwt', {session: false}), controller.createEducationEntity);
router.patch('/:id', passport.authenticate('jwt', {session: false}), controller.updateEducationalEntity);
router.get('/', controller.getAllEducationalEntities);
router.get('/:id', controller.getOneEducationalEntityById);
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.deleteEducationalEntity);

module.exports = router
