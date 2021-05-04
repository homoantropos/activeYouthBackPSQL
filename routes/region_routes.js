const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../controllers/region_controller');

router.post('/', passport.authenticate('jwt', {session: false}), controller.createRegion);
router.patch('/', passport.authenticate('jwt', {session: false}), controller.updateRegion);
router.get('/', controller.getAllRegions);
router.get('/:id', controller.getOneRegionById);
router.get('/', controller.getRegionsByGroup);
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.deleteRegion);

module.exports = router
