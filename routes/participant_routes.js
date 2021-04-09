const express = require('express');
const router = express.Router()
const controller = require('../controllers/participant_controller');

router.post('/', controller.createParticipant);
router.patch('/', controller.updateParticipant);
router.get('/', controller.getAllParticipants);
router.get('/:id', controller.getOneParticipantById);
router.get('/:activityId', controller.getParticipantsByAppointment);
router.get('/:gender', controller.getParticipantsByGender);
router.get('/:kind', controller.getParticipantsByKind);
router.delete('/:id', controller.deleteParticipant);

module.exports = router