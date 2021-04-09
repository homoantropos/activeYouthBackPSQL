const express = require('express');
const router = express.Router()
const controller = require('../controllers/news_controller');

router.post('/', controller.createNews);
router.patch('/', controller.updateNews);
router.get('/', controller.getAllNews);
router.get('/:id', controller.getOneNewsById);
router.get('/:date', controller.getNewsByDate);
router.delete('/:id', controller.deleteNews);

module.exports = router