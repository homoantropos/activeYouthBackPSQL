const express = require('express');
const router = express.Router()
const controller = require('../controllers/region_controller');

router.post('/', controller.createRegion);
router.patch('/', controller.updateRegion);
router.get('/', controller.getAllRegions);
router.get('/:id', controller.getOneRegionById);
router.get('/:group', controller.getRegionsByGroup);
router.delete('/:id', controller.deleteRegion);

module.exports = router