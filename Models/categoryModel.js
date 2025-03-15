const mongoose = require('mongoose');

// 1) Create Schema
const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category required'],
      unique: [true, 'Category must be unique'],
      minlength: [3, 'Too short category name'],
      maxlength: [32, 'Too long category name'],
    },
    // A and B => shopping.com/a-and-b
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);

const setImageURL = (doc) =>{
  if(doc.image){
    const imageUrl = `${process.env.BASE_URL}/categories/${doc.image}`;
    
    doc.image = imageUrl;
  }
}

// findOne , fondAll , update
CategorySchema.post('init' , (doc)=>{
 setImageURL(doc)
})

// create
CategorySchema.post('save' ,(doc)=>{
  setImageURL(doc)
 } )
 
// 2) Create Model
const CategoryModel = mongoose.model('Category', CategorySchema);

module.exports = CategoryModel;
