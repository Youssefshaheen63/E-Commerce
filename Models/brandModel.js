const mongoose = require('mongoose');

// 1) Create Schema
const BrandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Brand required'],
      unique: [true, 'Brand must be unique'],
      minlength: [3, 'Too short Brand name'],
      maxlength: [32, 'Too long Brand name'],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true },
);


const setImageURL = (doc) =>{
  if(doc.image){
    const imageUrl = `${process.env.BASE_URL}/brands/${doc.image}`;
    
    doc.image = imageUrl;
  }
}

// findOne , fondAll , update
BrandSchema.post('init' , (doc)=>{
 setImageURL(doc)
})

// create
BrandSchema.post('save' ,(doc)=>{
  setImageURL(doc)
 } )
 


// 2) Create Model
const BrandModel = mongoose.model('Brand', BrandSchema);

module.exports = BrandModel;
