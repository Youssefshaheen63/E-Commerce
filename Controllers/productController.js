const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const Product = require('../Models/productModel');

/**
 * @desc Get All Products
 * @route GET /api/v1/products
 * @access Public
 */
exports.getProducts = asyncHandler(async (req, res) => {
  // 1) Filtering
  const queryStringObj = { ...req.query };
  const excludeFields = ['page', 'sort', 'limit', 'fields' , 'keyword'];
  excludeFields.forEach((el) => delete queryStringObj[el]);

  // Apply Advanced Filtering
  let queryString = JSON.stringify(queryStringObj);
  queryString = queryString.replace(
    /\b(gte|gt|lte|lt)\b/g,
    (match) => `$${match}`,
  );
  // console.log(queryString);

  // 2) Pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 50;
  const skip = (page - 1) * limit;

  // Build
  let finalQuery = Product.find(JSON.parse(queryString))
    .skip(skip)
    .limit(limit)
    .populate({
      path: 'category',
      select: 'name -_id',
    });

  // Sorting
  if (req.query.sort) {
    const sort = req.query.sort.split(',').join(' ');
    finalQuery = finalQuery.sort(`${sort}`);
  } else {
    finalQuery = finalQuery.sort('-createdAt');
  }

  // fields Limiting
  if (req.query.fields) {
    // console.log(req.query.fields);
    const fieldsLimintg = req.query.fields.split(',').join(' ');
    // console.log(fieldsLimintg);
    finalQuery = finalQuery.select(fieldsLimintg);
  } else {
    finalQuery = finalQuery.select('-__v');
  }

  // Search
  if (req.query.keyword) {
    const query = {};
    query.$or = [
      { title: { $regex: req.query.keyword, $options: 'i' } },
      { description: { $regex: req.query.keyword, $options: 'i' } },
    ];

    finalQuery = finalQuery.find(query);
  }

  // Execute Query
  const products = await finalQuery;
  res.status(200).json({
    resultes: products.length,
    page,
    data: products,
  });
});

/**
 * @desc Get Specific Product
 * @route GET /api/v1/products/:id
 * @access Public
 */
exports.getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate({
    path: 'category',
    select: 'name -_id',
  });

  if (!product) {
    return next(new ApiError(`No Product exist by this ${id}`, 404));
  }

  res.status(200).json({
    data: product,
  });
});

/**
 * @desc Create Product
 * @route /api/v1/products/create-product
 * @access Private
 */
exports.createProduct = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  const product = await Product.create(req.body);
  res.status(201).json({ data: product });
});

/**
 * @desc Update Product
 * @route PATCH /api/v1/products/:id
 * @access Private
 */
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }

  const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });

  if (!product) {
    return next(new ApiError(`No Product exist by this ${id}`, 404));
  }

  res.status(200).json({
    data: product,
  });
});

/**
 * @desc Delete Product
 * @route DELETE /api/v1/products/:id
 * @access Private
 */
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    return next(new ApiError(`No Product exist by this ${id}`, 404));
  }

  res.status(204).json({
    data: null,
  });
});
