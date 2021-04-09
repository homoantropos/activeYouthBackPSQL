const express = require('express');
const router = express.Router()
const controller = require('../controllers/activity_controller');

router.post('/', controller.createActivity);
router.patch('/', controller.updateActivity);
router.get('/', controller.getAllActivities);
router.get('/:id', controller.getOneActivityById);
router.get('/:activityType', controller.getAllActivitiesByActivityType);
router.get('/:userId', controller.getAllActivitiesByUserId);
router.delete('/:id', controller.deleteActivity);

module.exports = router