const express = require('express');
const router = express.Router()
const passport = require('passport');
const controller = require('../controllers/town_controller');

router.post('/', passport.authenticate('jwt', {session: false}), controller.createTown);
router.patch('/', passport.authenticate('jwt', {session: false}), controller.updateTown);
router.get('/', controller.getAllTowns);
router.get('/:id', controller.getOneTownById);
router.get('/:country', controller.getTownsByCountry);
router.get('/:region', controller.getTownsByRegion);
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.deleteTown);

module.exports = router
