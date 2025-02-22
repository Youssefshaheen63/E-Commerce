const express = require('express');

const brandController = require('../Controllers/brandController');
const validators = require('../utils/validators/brandValidator');

const router = express.Router();

router.get('/', brandController.getBrands);

router.post(
  '/create-brand',
  validators.createBrandValidators,
  brandController.createBrand,
);

router
  .route('/:id')
  .get(validators.getBrandValdiators, brandController.getBrand)
  .patch(validators.updateBrandValdiators, brandController.updateBrand)
  .delete(validators.deleteBrandValdiators, brandController.deleteBrand);
module.exports = router;
