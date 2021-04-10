const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../controllers/user_controller');

router.post('/', controller.registerUser);
router.patch('/:id', controller.updateUser);
router.post('/login', controller.login);
router.get('/', passport.authenticate('jwt', {session: false}), controller.getAllUsers);
router.get('/:id', controller.getOneUserById);
router.delete('/:id', controller.deleteUser);

module.exports = router
