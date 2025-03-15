const express = require('express');
const {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  uploadCategoryImage,
  resizeImage
} = require('../Controllers/categoryController');



const validators = require('../utils/validators/categoryValidator');

const subcategoriesRoute = require('./subCategoryRoutes');

const router = express.Router();

router.use('/:categoryId/subcategories', subcategoriesRoute);

router.get('/', getCategories);

router.post(
  '/',
  uploadCategoryImage,
  resizeImage,
  validators.createCategoryValidators,
  createCategory,
);

router
  .route('/:id')
  .get(validators.getCategoryValdiators, getCategory)
  .patch(
    uploadCategoryImage,
    resizeImage,
    validators.updateCategoryValdiators,
     updateCategory)
  .delete(validators.deleteCategoryValdiators, deleteCategory);
module.exports = router;
