const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const SubCategory = require('../Models/subCategoryModel');

/**
 * @desc Create SubCategory
 * @route /api/v1/subcategories/create-subcategory
 * @access Private
 */

exports.setCategoryIdToBody = asyncHandler(async (req, res, next) => {
  if (!req.body.categoryId) req.body.category = req.params.categoryId;
  next();
});
exports.createsubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  const subCategory = await SubCategory.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ data: subCategory });
});

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
exports.getSubCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 2;
  const skip = (page - 1) * limit;

  console.log(req.params.categoryId);

  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };

  const subcategories = await SubCategory.find(filterObject)
    .skip(skip)
    .limit(limit);
  // .populate({
  //   path: 'category',
  //   select: 'name -_id',
  // });
  res.status(200).json({
    resultes: subcategories.length,
    page,
    data: subcategories,
  });
});

/**
 * @desc Get Specific SubCategory
 * @route GET /api/v1/subcategories/:id
 * @access Public
 */
exports.getSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subcategory = await SubCategory.findById(id);

  if (!subcategory) {
    return next(new ApiError(`No SubCategory exist by this ${id}`, 404));
  }

  res.status(200).json({
    data: subcategory,
  });
});

/**
 * @desc Update SubCategory
 * @route PATCH /api/v1/subcategories/:id
 * @access Private
 */
exports.updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;

  const subcategory = await SubCategory.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name), category },
    { new: true },
  );

  if (!subcategory) {
    return next(new ApiError(`No SubCategory exist by this ${id}`, 404));
  }

  res.status(200).json({
    data: subcategory,
  });
});

/**
 * @desc Delete SubCategory
 * @route DELETE /api/v1/subcategories/:id
 * @access Private
 */

exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subcategory = await SubCategory.findByIdAndDelete(id);

  if (!subcategory) {
    return next(new ApiError(`No SubCategory exist by this ${id}`, 404));
  }

  res.status(204).json({
    data: null,
  });
});
