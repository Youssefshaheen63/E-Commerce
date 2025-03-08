const slugify = require('slugify');

const { check , body} = require('express-validator');
const validatorMiddleware = require('../../Middlewares/validatorMiddleware');

exports.getSubCategoryValdiators = [
  check('id').isMongoId().withMessage('Invalid Category Id format'),
  validatorMiddleware,
];

exports.createSubCategoryValidators = [
  check('name')
    .notEmpty()
    .withMessage('SubCategory name is required')
    .isLength({ min: 2, max: 32 })
    .withMessage('Category name must be between 3 to 32 characters')
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check('category')
    .notEmpty()
    .withMessage('Category is required')
    .isMongoId()
    .withMessage('Invalid Category Id format'),
  validatorMiddleware,
];

exports.updateSubCategoryValdiators = [
  check('id').isMongoId().withMessage('Invalid SubCategory Id format'),
  body('name').custom((val , {req})=>{
    req.body.slug = slugify(val)
    return true
}),

  validatorMiddleware,
];
exports.deleteSubCategoryValdiators = [
  check('id').isMongoId().withMessage('Invalid SubCategory Id format'),
  validatorMiddleware,
];
