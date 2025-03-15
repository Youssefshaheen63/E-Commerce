const sharp = require('sharp')
const asyncHandler = require('express-async-handler');
const { v4: uuidv4 } = require('uuid');
const factory = require('./handlersFactory');
const {uploadSingleImage} = require('../Middlewares/fileUpload')
const Category = require('../Models/categoryModel');


// Upload image
exports.uploadCategoryImage = uploadSingleImage("image");

// image processing
exports.resizeImage = asyncHandler( async(req , res , next)=>{
  const filename = `category-${uuidv4()}-${Date.now()}.jpeg`

  await sharp(req.file.buffer)
  .resize(600 , 600)
  .toFormat('jpeg')
  .jpeg({quality: 90})
  .toFile(`uploads/categories/${filename}`)


  // Save image into our db
  req.body.image =filename
  next()
})
/**
 * @desc Get All Categories
 * @route GET /api/v1/categories
 * @access Public
 */
exports.getCategories = factory.getAll(Category);

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
exports.createCategory = factory.createOne(Category);

/**
 * @desc Update Category
 * @route PATCH /api/v1/categories/:id
 * @access Private
 */
exports.updateCategory = factory.updateOne(Category);

/**
 * @desc Delete Category
 * @route DELETE /api/v1/categories/:id
 * @access Private
 */

exports.deleteCategory = factory.deleteOne(Category);
