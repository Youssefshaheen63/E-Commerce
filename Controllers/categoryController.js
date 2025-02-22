const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const Category = require('../Models/categoryModel');

/**
 * @desc Get All Categories
 * @route GET /api/v1/categories
 * @access Public
 */
exports.getCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 2;
  const skip = (page - 1) * limit;
  const categories = await Category.find({}).skip(skip).limit(limit);
  res.status(200).json({
    resultes: categories.length,
    data: categories,
  });
});

/**
 * @desc Get Specific Category
 * @route GET /api/v1/categories/:id
 * @access Public
 */
exports.getCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);

  if (!category) {
    return next(new ApiError(`No Category exist by this ${id}`, 404));
  }

  res.status(200).json({
    data: category,
  });
});

/**
 * @desc Create Category
 * @route /api/v1/categories/create-category
 * @access Private
 */
exports.createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const category = await Category.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});

/**
 * @desc Update Category
 * @route PATCH /api/v1/categories/:id
 * @access Private
 */
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const category = await Category.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true },
  );

  if (!category) {
    return next(new ApiError(`No Category exist by this ${id}`, 404));
  }

  res.status(200).json({
    data: category,
  });
});

/**
 * @desc Delete Category
 * @route DELETE /api/v1/categories/:id
 * @access Private
 */

exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete(id);

  if (!category) {
    return next(new ApiError(`No Category exist by this ${id}`, 404));
  }

  res.status(204).json({
    data: null,
  });
});
