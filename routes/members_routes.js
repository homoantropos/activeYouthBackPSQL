const express = require('express');
const router = express.Router()
const controller = require('../controllers/members_controller');

router.post('/', controller.createMember);
router.patch('/', controller.updateMember);
router.get('/', controller.getAllMembers);
router.get('/:id', controller.getOneMemberById);
router.get('/:userId', controller.getMembersByUserId);
router.delete('/:id', controller.deleteMember);

module.exports = router