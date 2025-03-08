const factory = require('./handlersFactory');
const Product = require('../Models/productModel');

/**
 * @desc Get All Products
 * @route GET /api/v1/products
 * @access Public
 */
exports.getProducts = factory.getAll(Product, 'Product');

/**
 * @desc Get Specific Product
 * @route GET /api/v1/products/:id
 * @access Public
 */
exports.getProduct =  factory.getOne(Product);


/**
 * @desc Create Product
 * @route /api/v1/products/create-product
 * @access Private
 */
exports.createProduct =  factory.createOne(Product);

/**
 * @desc Update Product
 * @route PATCH /api/v1/products/:id
 * @access Private
 */
exports.updateProduct =factory.updateOne(Product);

/**
 * @desc Delete Product
 * @route DELETE /api/v1/products/:id
 * @access Private
 */
exports.deleteProduct = factory.deleteOne(Product);
