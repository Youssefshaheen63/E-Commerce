const factory = require('./handlersFactory')
const Brand = require('../Models/brandModel');

/**
 * @desc Get All Brands
 * @route GET /api/v1/brands
 * @access Public
 */
exports.getBrands = factory.getAll(Brand);

/**
 * @desc Get Specific Brand
 * @route GET /api/v1/brands/:id
 * @access Public
 */
exports.getBrand = factory.getOne(Brand);
/**
 * @desc Create Brand
 * @route /api/v1/categories/create-brand
 * @access Private
 */
exports.createBrand = factory.createOne(Brand);


// @desc    Update specific brand
// @route   PUT /api/v1/brands/:id
// @access  Private
exports.updateBrand = factory.updateOne(Brand);


/**
 * @desc Delete Brand
 * @route DELETE /api/v1/brands/:id
 * @access Private
 */

exports.deleteBrand = factory.deleteOne(Brand);
