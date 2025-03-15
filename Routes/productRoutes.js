const express = require('express');

const productController = require('../Controllers/productController');
const validators = require('../utils/validators/productValidator');

const router = express.Router();

router.get('/', productController.getProducts);

router.post(
  '/',
  productController.uploadProductImages,
  productController.resizeProductsImages,
  validators.createProductvValidators,
  productController.createProduct,
);

router
  .route('/:id')
  .get(validators.getProductValdiators, productController.getProduct)
  .patch(
    productController.uploadProductImages,
    productController.resizeProductsImages,
    validators.updateProductValdiators,
    productController.updateProduct)
  .delete(validators.deleteProductValdiators, productController.deleteProduct);
module.exports = router;
