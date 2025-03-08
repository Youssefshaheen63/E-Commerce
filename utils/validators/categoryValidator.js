const slugify = require('slugify');
const { check , body } = require('express-validator');
const validatorMiddleware = require('../../Middlewares/validatorMiddleware');

exports.getCategoryValdiators = [
  check('id').isMongoId().withMessage('Invalid Category Id format'),
  validatorMiddleware,
];

exports.createCategoryValidators = [
  check('name')
    .notEmpty()
    .withMessage('Category name is required')
    .isLength({ min: 3, max: 32 })
    .withMessage('Category name must be between 3 to 32 characters')
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

exports.updateCategoryValdiators = [
  check('id').isMongoId().withMessage('Invalid Category Id format'),
  body('name').custom((val , {req})=>{
      req.body.slug = slugify(val)
      return true
  }),
    validatorMiddleware,
];
exports.deleteCategoryValdiators = [
  check('id').isMongoId().withMessage('Invalid Category Id format'),
  validatorMiddleware,
];
