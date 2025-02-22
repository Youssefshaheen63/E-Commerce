const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const Brand = require('../Models/brandModel');

/**
 * @desc Get All Brands
 * @route GET /api/v1/brands
 * @access Public
 */
exports.getBrands = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 2;
  const skip = (page - 1) * limit;
  const brands = await Brand.find({}).skip(skip).limit(limit);
  res.status(200).json({
    resultes: brands.length,
    data: brands,
  });
});

/**
 * @desc Get Specific Brand
 * @route GET /api/v1/brands/:id
 * @access Public
 */
exports.getBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findById(id);

  if (!brand) {
    return next(new ApiError(`No Brand exist by this ${id}`, 404));
  }

  res.status(200).json({
    data: brand,
  });
});

/**
 * @desc Create Brand
 * @route /api/v1/categories/create-brand
 * @access Private
 */
exports.createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const brand = await Brand.create({ name, slug: slugify(name) });
  res.status(201).json({ data: brand });
});

/**
 * @desc Update Brand
 * @route PATCH /api/v1/brands/:id
 * @access Private
 */
exports.updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const brand = await Brand.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true },
  );

  if (!brand) {
    return next(new ApiError(`No Brand exist by this ${id}`, 404));
  }

  res.status(200).json({
    data: brand,
  });
});

/**
 * @desc Delete Brand
 * @route DELETE /api/v1/brands/:id
 * @access Private
 */

exports.deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findByIdAndDelete(id);

  if (!brand) {
    return next(new ApiError(`No Brand exist by this ${id}`, 404));
  }

  res.status(204).json({
    data: null,
  });
});
