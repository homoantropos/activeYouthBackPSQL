const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../controllers/appointment_place_controller');

router.post('/', passport.authenticate('jwt', {session: false}), controller.createAppointmentPlace);
router.patch('/:id', passport.authenticate('jwt', {session: false}), controller.updateAppointmentPlace);
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.deleteAppointmentPlace);
router.get('/', controller.getAllPlaces);
router.get('/:id', controller.getOneAppointmentPlaceById);

module.exports = router
