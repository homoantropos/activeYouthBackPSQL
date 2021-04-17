const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../controllers/sport_hall_controller');

router.post('/', passport.authenticate('jwt', {session: false}), controller.createSportHall);
router.patch('/', passport.authenticate('jwt', {session: false}), controller.updateSportHall);
router.get('/', controller.getAllSportHalls);
router.get('/:id', controller.getOneSportHallById);
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.deleteSportHall);

module.exports = router
