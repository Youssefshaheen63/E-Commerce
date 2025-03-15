const sharp = require('sharp')
const asyncHandler = require('express-async-handler');
const { v4: uuidv4 } = require('uuid');
const {uploadMixImages}= require('../Middlewares/fileUpload')
const factory = require('./handlersFactory');
const Product = require('../Models/productModel');

exports.uploadProductImages = uploadMixImages([
    {
        name : 'imageCover',
        maxCount: 1
    },
    {
        name: 'images',
        maxCount:5
    }
]) 

exports.resizeProductsImages = asyncHandler(
     async(req , res , next)=>{
        // console.log(req.files);
  if(req.files.imageCover){
    const imageCoverFileName = `product-${uuidv4()}-${Date.now()}-cover.jpeg`
    
      await sharp(req.files.imageCover[0].buffer)
      .resize(1200 , 1333)
      .toFormat('jpeg')
      .jpeg({quality: 90})
      .toFile(`uploads/products/${imageCoverFileName}`)
    
    
      // Save image into our db
      req.body.imageCover =imageCoverFileName
  }

  if(req.files.images){
    req.body.images = []

    
   await Promise.all(
    req.files.images.map(async(img , index) => {
    const imageName = `product-${uuidv4()}-${Date.now()}-${index+1}.jpeg`
    
    await sharp(img.buffer)
    .resize(2000 , 1333)
    .toFormat('jpeg')
    .jpeg({quality: 90})
    .toFile(`uploads/products/${imageName}`)
  
  
    // Save image into our db
    req.body.images.push(imageName)
    })
   )
    // console.log(req.body.imageCover);
    // console.log(req.body.images);
    next()
  }
    }
)


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
