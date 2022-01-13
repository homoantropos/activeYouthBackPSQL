const express = require('express');
const router = express.Router()
const controller = require('../controllers/appointment_financing_controller');
const passport = require("passport");

router.patch('/', passport.authenticate('jwt', {session: false}), controller.updateAppointmentFinancing);
router.get('/', passport.authenticate('jwt', {session: false}), controller.getAllAppointmentsFinancing);
router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getOneAppointmentFinancingById);
router.get('/:activityId', passport.authenticate('jwt', {session: false}), controller.getAppointmentsFinancingByActivity);
router.get('/:userId', passport.authenticate('jwt', {session: false}), controller.getAppointmentsFinancingByUserId);
router.get('/:date', passport.authenticate('jwt', {session: false}), controller.getAppointmentsFinancingByDate);
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.deleteAppointmentFinancing);

module.exports = router
