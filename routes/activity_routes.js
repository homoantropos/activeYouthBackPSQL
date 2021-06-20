const express = require('express');
const router = express.Router();
const passport = require('passport');

const controller = require('../controllers/activity_controller');
const upload = require('../middleware/upload');

router.post('/', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.createActivity);
router.patch('/:id', passport.authenticate('jwt', {session: false}), controller.updateActivity);
router.get('/', controller.getAllActivities);
router.get('/:id', controller.getOneActivityById);
router.get('/:userId', controller.getAllActivitiesByUserId);
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.deleteActivity);

module.exports = router
