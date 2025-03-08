const slugify = require('slugify')
const { check, body } = require('express-validator');
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
    .withMessage('Brand name must be between 3 to 32 characters')
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

exports.updateBrandValdiators = [
  check('id').isMongoId().withMessage('Invalid Brand Id format'),
  body('name').custom((val , {req})=>{
       req.body.slug = slugify(val)
       return true
  }),
  validatorMiddleware,
];
exports.deleteBrandValdiators = [
  check('id').isMongoId().withMessage('Invalid Brand Id format'),
  validatorMiddleware,
];
