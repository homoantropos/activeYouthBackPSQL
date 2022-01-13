const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../controllers/report_controller');

router.patch('/', passport.authenticate('jwt', {session: false}), controller.updateReport);
router.get('/', controller.getAllReports);
router.get('/:id', controller.getOneReportById);
router.get('/:activityId', controller.getReportsByActivity);
router.get('/:participantsType', controller.getReportsByKindOfStudent);
router.get('/:userId', controller.getReportsByUserId);
router.get('/:date', controller.getReportsByDate);
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.deleteReport);

module.exports = router
