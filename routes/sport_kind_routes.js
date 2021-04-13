const express = require('express');
const router = express.Router()
const controller = require('../controllers/sport_kind_controller');

router.post('/', controller.createSportKind);
router.patch('/', controller.updateSportKind);
router.get('/', controller.getAllSportKinds);
router.get('/:id', controller.getOneSportKindById);
router.delete('/:id', controller.deleteSportKind);

module.exports = router
