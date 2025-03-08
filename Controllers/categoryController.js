const factory = require('./handlersFactory');
const Category = require('../Models/categoryModel');


/**
 * @desc Get All Categories
 * @route GET /api/v1/categories
 * @access Public
 */
exports.getCategories =  factory.getAll(Category);

/**
 * @desc Get Specific Category
 * @route GET /api/v1/categories/:id
 * @access Public
 */
exports.getCategory = factory.getOne(Category);

/**
 * @desc Create Category
 * @route /api/v1/categories/create-category
 * @access Private
 */
exports.createCategory =  factory.createOne(Category);

/**
 * @desc Update Category
 * @route PATCH /api/v1/categories/:id
 * @access Private
 */
exports.updateCategory =  factory.updateOne(Category);

/**
 * @desc Delete Category
 * @route DELETE /api/v1/categories/:id
 * @access Private
 */

exports.deleteCategory = factory.deleteOne(Category);
