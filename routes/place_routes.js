const express = require('express');
const router = express.Router()
const controller = require('../controllers/place_controller');

router.post('/', controller.createPlace);
router.patch('/', controller.updatePlace);
router.get('/', controller.getAllPlaces);
router.get('/:id', controller.getOnePlaceById);
router.delete('/:id', controller.deletePlace);

module.exports = router