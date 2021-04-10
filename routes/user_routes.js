const express = require('express');
const router = express.Router()
const controller = require('../controllers/user_controller');

router.post('/', controller.registerUser);
router.patch('/:id', controller.updateUser);
router.post('/login', controller.login);
router.get('/', controller.getAllUsers);
router.get('/:id', controller.getOneUserById);
router.delete('/:id', controller.deleteUser);

module.exports = router