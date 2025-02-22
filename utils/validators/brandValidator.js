const { check } = require('express-validator');
const validatorMiddleware = require('../../Middlewares/validatorMiddleware');

exports.getBrandValdiators = [
  check('id').isMongoId().withMessage('Invalid Brand Id format'),
  validatorMiddleware,
];

exports.createBrandValidators = [
  check('name')
    .notEmpty()
    .withMessage('Brand name is required')
    .isLength({ min: 3, max: 32 })
    .withMessage('Brand name must be between 3 to 32 characters'),
  validatorMiddleware,
];

exports.updateBrandValdiators = [
  check('id').isMongoId().withMessage('Invalid Brand Id format'),
  validatorMiddleware,
];
exports.deleteBrandValdiators = [
  check('id').isMongoId().withMessage('Invalid Brand Id format'),
  validatorMiddleware,
];
