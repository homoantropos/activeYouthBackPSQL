const express = require('express');
const router = express.Router()
const controller = require('../controllers/country_controller');

router.post('/', controller.createCountry);
router.patch('/', controller.updateCountry);
router.get('/', controller.getAllCountries);
router.get('/:id', controller.getOneCountryById);
router.delete('/:id', controller.deleteCountry);

module.exports = router