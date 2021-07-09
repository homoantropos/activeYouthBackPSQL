const express = require('express');
const router = express.Router()
const controller = require('../controllers/coach_controller');
const passport = require('passport');

router.post('/', passport.authenticate('jwt', {session: false}), controller.createCoach);
router.patch('/', passport.authenticate('jwt', {session: false}), controller.updateCoach);
router.get('/', controller.getAllCoaches);
router.get('/:id', controller.getOneCoachById);
router.get('/:activityId', controller.getCoachesByActivity);
router.get('/:userId', controller.getCoachesByUserId);
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.deleteCoach);

module.exports = router
