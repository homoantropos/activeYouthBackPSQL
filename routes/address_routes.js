const express = require('express');
const router = express.Router()
const controller = require('../controllers/address_controller');

router.post('/', controller.createAddress);
router.patch('/', controller.updateAddress);
router.get('/', controller.getAllAddress);
router.get('/:id', controller.getOneAddressById);
router.get('/:countryId', controller.getAddressByCountry);
router.get('/:regionId', controller.getAddressByRegion);
router.get('/:townId', controller.getAddressByTown);
router.delete('/:id', controller.deleteAddress);

module.exports = router