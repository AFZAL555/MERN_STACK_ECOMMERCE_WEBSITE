const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({


    categoryname: {
        type: String,
        required: [true, 'Please Enter category Name !'],
        trim: true
    },
    createdAt:
    {
        type: Date,
        default: Date.now,
    },
    statusSub: {
        type: String,
        default: false,
    },


});

const Category = mongoose.model("Category", categorySchema);


module.exports = { Category };