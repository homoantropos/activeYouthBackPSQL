const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../controllers/members_controller');

router.post('/', passport.authenticate('jwt', {session: false}), controller.createMember);
router.patch('/', passport.authenticate('jwt', {session: false}), controller.updateMember);
router.get('/', controller.getAllMembers);
router.get('/:id', controller.getOneMemberById);
router.get('/:userId', controller.getMembersByUserId);
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.deleteMember);

module.exports = router
