const sharp = require('sharp')
const asyncHandler = require('express-async-handler');
const { v4: uuidv4 } = require('uuid');
const factory = require('./handlersFactory')
const {uploadSingleImage} = require('../Middlewares/fileUpload')
const Brand = require('../Models/brandModel');



// Upload image
exports.uploadBrandImage = uploadSingleImage("image");

// image processing
exports.resizeImage = asyncHandler( async(req , res , next)=>{
  const filename = `brand-${uuidv4()}-${Date.now()}.jpeg`

  await sharp(req.file.buffer)
  .resize(600 , 600)
  .toFormat('jpeg')
  .jpeg({quality: 90})
  .toFile(`uploads/brands/${filename}`)


  // Save image into our db
  req.body.image =filename
  next()
})


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
