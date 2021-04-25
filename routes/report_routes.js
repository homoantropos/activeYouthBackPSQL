const express = require('express');
const router = express.Router()
const controller = require('../controllers/report_controller');

router.post('/', controller.createReport);
router.patch('/', controller.updateReport);
router.get('/', controller.getAllReports);
router.get('/:id', controller.getOneReportById);
router.get('/:activityId', controller.getReportsByActivity);
router.get('/:participantsType', controller.getReportsByKindOfStudent);
router.get('/:userId', controller.getReportsByUserId);
router.get('/:date', controller.getReportsByDate);
router.delete('/:id', controller.deleteReport);

module.exports = router
