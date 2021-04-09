const express = require('express');
const router = express.Router()
const controller = require('../controllers/appointment_controller');

router.post('/', controller.createAppointment);
router.patch('/', controller.updateAppointment);
router.get('/', controller.getAllAppointments);
router.get('/:id', controller.getOneAppointmentById);
router.get('/:activityId', controller.getAppointmentsByActivity);
router.get('/:participantsType', controller.getAppointmentsByParticipantsType);
router.get('/:userId', controller.getAppointmentsByUserId);
router.get('/:date', controller.getAppointmentsByDate);
router.delete('/:id', controller.deleteAppointment);

module.exports = router