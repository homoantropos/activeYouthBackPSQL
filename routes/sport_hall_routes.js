const express = require('express');
const router = express.Router()
const controller = require('../controllers/sport_hall_controller');

router.post('/', controller.createSportHall);
router.patch('/', controller.updateSportHall);
router.get('/', controller.getAllSportHalls);
router.get('/:id', controller.getOneSportHallById);
router.get('/:countryId', controller.getSportHallsByCountry);
router.get('/:regionId', controller.getSportHallsByRegion);
router.get('/:townId', controller.getSportHallsByTown);
router.delete('/:id', controller.deleteSportHall);

module.exports = router