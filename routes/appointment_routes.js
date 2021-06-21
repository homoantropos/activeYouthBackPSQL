const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../controllers/appointment_controller');
const upload = require('../middleware/upload');

router.post('/', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.createAppointment);
router.patch('/', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.updateAppointment);
router.get('/', controller.getAllAppointments);
router.get('/calendar', controller.getCalendar);
router.get('/:id', controller.getOneAppointmentById);
router.get('/:activityId', controller.getAppointmentsByActivity);
router.get('/:participantsType', controller.getAppointmentsByParticipantsType);
router.get('/:userId', controller.getAppointmentsByUserId);
router.get('/:date', controller.getAppointmentsByDate);
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.deleteAppointment);

module.exports = router
