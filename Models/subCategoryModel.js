const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'SubCategory must have name'],
      unique: [true, 'SubCategory must be unique'],
      trim: true,
      minlength: [2, 'Too short SubCategory name'],
      maxlength: [32, 'Too long SubCategory name'],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
      required: [true, 'SubCategory must have Parent Category'],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('SubCategory', subCategorySchema);
