const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema({
    
    subcategoryname:{
        type: String,
        required: [true, 'Please Enter category Name !'],
        trim: true
    },
    parentCatId:{
        type:String,
        required: true,

    },
    offerstatus:{
        type:Boolean,
        default:false,
        required:false,
    },
    discount:{
        type:Number,
        default:0,
        required:false,

    },
    createdAt:
    {
        type: Date,
        default: Date.now,
    },
   

    
});

const SubCategory = mongoose.model("Sub-Category", subcategorySchema);


module.exports = { SubCategory };