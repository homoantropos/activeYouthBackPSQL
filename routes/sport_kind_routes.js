const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../controllers/sport_kind_controller');

router.post('/', passport.authenticate('jwt', {session: false}), controller.createSportKind);
router.patch('/', passport.authenticate('jwt', {session: false}), controller.updateSportKind);
router.get('/', controller.getAllSportKinds);
router.get('/:id', controller.getOneSportKindById);
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.deleteSportKind);

module.exports = router
