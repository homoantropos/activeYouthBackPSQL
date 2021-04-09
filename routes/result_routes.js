const express = require('express');
const router = express.Router()
const controller = require('../controllers/result_controller');

router.post('/', controller.createResult);
router.patch('/', controller.updateResult);
router.get('/', controller.getAllResults);
router.get('/:id', controller.getOneResultById);
router.get('/:activityId', controller.getResultsByActivity);
router.get('/:participantsType', controller.getResultsByKindOfStudents);
router.get('/:userId', controller.getResultsByUserId);
router.get('/:date', controller.getResultsByDate);
router.delete('/:id', controller.deleteResult);

module.exports = router