const express = require('express');
const router = express.Router()
const controller = require('../controllers/appointment_financing_controller');

router.patch('/', controller.updateAppointmentFinancing);
router.get('/', controller.getAllAppointmentsFinancing);
router.get('/:id', controller.getOneAppointmentFinancingById);
router.get('/:activityId', controller.getAppointmentsFinancingByActivity);
router.get('/:userId', controller.getAppointmentsFinancingByUserId);
router.get('/:date', controller.getAppointmentsFinancingByDate);
router.delete('/:id', controller.deleteAppointmentFinancing);

module.exports = router
