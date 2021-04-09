const express = require('express');
const router = express.Router()
const controller = require('../controllers/expenses_controller');

router.post('/', controller.createExpenses);
router.patch('/', controller.updateExpenses);
router.get('/', controller.getAllExpenses);
router.get('/:id', controller.getOneExpenseById);
router.delete('/:Id', controller.deleteExpenses);

module.exports = router