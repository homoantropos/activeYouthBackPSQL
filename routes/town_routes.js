const express = require('express');
const router = express.Router()
const controller = require('../controllers/town_controller');

router.post('/', controller.createTown);
router.patch('/', controller.updateTown);
router.get('/', controller.getAllTowns);
router.get('/:id', controller.getOneTownById);
router.get('/:country', controller.getTownsByCountry);
router.get('/:region', controller.getTownsByRegion);
router.delete('/:id', controller.deleteTown);

module.exports = router