const express = require('express');

const {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require('../Controllers/categoryController');

const router = express.Router();

router.get('/', getCategories);

router.post('/create-category', createCategory);

router
  .route('/:id')
  .get(getCategory)
  .patch(updateCategory)
  .delete(deleteCategory);
module.exports = router;
