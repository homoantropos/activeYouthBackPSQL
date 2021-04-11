const express = require('express');
const router = express.Router();
const passport = require('passport');

const controller = require('../controllers/activity_controller');

router.post('/', passport.authenticate('jwt', {session: false}), controller.createActivity);
router.patch('/', passport.authenticate('jwt', {session: false}), controller.updateActivity);
router.get('/', controller.getAllActivities);
router.get('/:id', controller.getOneActivityById);
router.get('/:userId', controller.getAllActivitiesByUserId);
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.deleteActivity);

module.exports = router
