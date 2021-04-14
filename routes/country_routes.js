const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../controllers/country_controller');

router.post('/',  passport.authenticate('jwt', {session: false}), controller.createCountry);
router.patch('/',  passport.authenticate('jwt', {session: false}), controller.updateCountry);
router.get('/', controller.getAllCountries);
router.get('/:id', controller.getOneCountryById);
router.delete('/:id',  passport.authenticate('jwt', {session: false}), controller.deleteCountry);

module.exports = router
