const express = require('express');

const {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require('../Controllers/categoryController');
const validators = require('../utils/validators/categoryValidator');
const router = express.Router();

router.get('/', getCategories);

router.post(
  '/create-category',
  validators.createCategoryValidators,
  createCategory
);

router
  .route('/:id')
  .get(validators.getCategoryValdiators, getCategory)
  .patch(validators.updateCategoryValdiators, updateCategory)
  .delete(validators.deleteCategoryValdiators, deleteCategory);
module.exports = router;
