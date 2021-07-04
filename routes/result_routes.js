const express = require('express');
const router = express.Router()
const controller = require('../controllers/result_controller');
const passport = require('passport');

router.post('/', passport.authenticate('jwt', {session: false}), controller.createResult);
router.patch('/', passport.authenticate('jwt', {session: false}), controller.updateResult);
router.get('/', controller.getAllResults);
router.get('/:id', controller.getOneResultById);
router.get('/appointment/:id', controller.getResultsByAppointment),
router.get('/:activityId', controller.getResultsByActivity);
router.get('/:participantsType', controller.getResultsByKindOfStudents);
router.get('/:userId', controller.getResultsByUserId);
router.get('/:date', controller.getResultsByDate);
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.deleteResult);

module.exports = router
