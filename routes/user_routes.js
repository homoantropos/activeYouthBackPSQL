const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../controllers/user_controller');

router.post('/', passport.authenticate('jwt', {session: false}),controller.registerUser);
router.patch('/:id', passport.authenticate('jwt', {session: false}), controller.updateUser);
router.post('/login', controller.login);
router.get('/', passport.authenticate('jwt', {session: false}), controller.getAllUsers);
router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getOneUserById);
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.deleteUser);

module.exports = router
