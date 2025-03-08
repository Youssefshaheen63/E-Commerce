const express = require('express');

const {
  createsubCategory,
  getSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
  setCategoryIdToBody,
  createFilterObj
} = require('../Controllers/subCategoryController');

const validators = require('../utils/validators/subCategoryValidator');

// mergeParams: Allow us to acess parameters on other routes
// ex: We need to access categoryId from category router
const router = express.Router({ mergeParams: true });

router.post(
  '/',
  setCategoryIdToBody,
  validators.createSubCategoryValidators,
  createsubCategory,
);
router.get('/',createFilterObj, getSubCategories);
router
  .route('/:id')
  .get(validators.getSubCategoryValdiators, getSubCategory)
  .patch(validators.updateSubCategoryValdiators, updateSubCategory)
  .delete(validators.deleteSubCategoryValdiators, deleteSubCategory);
module.exports = router;
