const factory = require('./handlersFactory');
const SubCategory = require('../Models/subCategoryModel');



exports.setCategoryIdToBody = (req, res, next) => {
  // Nested route (Create)
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

// Nested route
// GET /api/v1/categories/:categoryId/subcategories
exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  req.filterObj = filterObject;
  next();
};

/**
 * @desc Create SubCategory
 * @route /api/v1/subcategories/create-subcategory
 * @access Private
 */

exports.createsubCategory =  factory.createOne(SubCategory);

/**
 * Nested Routes :
 *     - GET /api/v1/categories/:categoryId/subcategories
 *     - GET /api/v1/products/:productId/reviews
 */

/**
 * @desc Get All SubCategories
 * @route GET /api/v1/subcategories
 * @access Public
 */
exports.getSubCategories = factory.getAll(SubCategory);

/**
 * @desc Get Specific SubCategory
 * @route GET /api/v1/subcategories/:id
 * @access Public
 */
exports.getSubCategory = factory.getOne(SubCategory);
/**
 * @desc Update SubCategory
 * @route PATCH /api/v1/subcategories/:id
 * @access Private
 */
exports.updateSubCategory = factory.updateOne(SubCategory);


/**
 * @desc Delete SubCategory
 * @route DELETE /api/v1/subcategories/:id
 * @access Private
 */

exports.deleteSubCategory = factory.deleteOne(SubCategory);
