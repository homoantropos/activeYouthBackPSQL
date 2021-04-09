const express = require('express');
const router = express.Router()
const controller = require('../controllers/coach_controller');

router.post('/', controller.createCoach);
router.patch('/', controller.updateCoach);
router.get('/', controller.getAllCoaches);
router.get('/:id', controller.getOneCoachById);
router.get('/:activityId', controller.getCoachesByActivity);
router.get('/:userId', controller.getCoachesByUserId);
router.delete('/:id', controller.deleteCoach);

module.exports = router