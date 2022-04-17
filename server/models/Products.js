const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productname: {
        type: String,
        required: [true, 'Please Enter Product Name !'],
        trim: true,
        maxLength: [100, "Product name cannot exceed 100 charecters !"]
    },
    price: {
        type: Number,
        required: [true, 'Please Enter Product Price !'],
        maxLength: [10, "Product 10 cannot exceed 100 charecters !"]
    },
    description: {
        type: String,
        required: [true, 'Please Enter Product Description !']

    },
    maincategoryname: {
        type: String,
        required: [true, 'Please Select Product Category !']
    },
    subcategoryname: {
        type: String,
        required: [true, 'Please Select Product Sub-Category !']
    },
    stock: {
        type: Number,
        required: [true, 'Please Enter Product Stock !'],
        maxLength: [5, "Product stock cannot exceed 5 charecters !"]
    },
    imgOne: {
        type: Array,
        required: [true, 'Please Add Product Image !'],

    },
    imgTwo: {
        type: Array,
        required: [true, 'Please Add Product Image !'],
    },
    imgThree: {
        type: Array,
        required: [true, 'Please Add Product Image !'],
    },
    imgFour: {
        type: Array,
        required: [true, 'Please Add Product Image !'],
    },
    imgFive: {
        type: Array,
        required: [true, 'Please Add Product Image !'],
    },
    offername:{
        type:String,
        required:false,
    },
    discount:{
        type: Number,
        required:false,
    },
    disprice:{
        type:Number,
        required:false,
        default:0,
    },
    offer:{
        type:Boolean,
        default:false,
        required:false
    }, 
     catoffer:{
        type:Boolean,
        default:false,
        required:false
    },
    offerdescription:{
        type:String,
        required:false,
    },
    lengthofrating:{
        type:Number,
        required:false
    },
    rating:{
        type:Array,
        required:false
    },
    createdAt:
    {
        type: Date,
        default: Date.now
    }

});

const Product = mongoose.model("Products", productSchema);


module.exports = { Product };