const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({


    userId: {
        type: String,
        required: true,
    },
    productId: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    proTotal: {
        type: Number,
        required: true,
    },
    mrp: {
        type: Number,
        required: true,
    },
    imgCart: {
        type: String,
        required: true,
    },
    createdAt:
    {
        type: Date,
        default: Date.now,
    },

});

const Cart = mongoose.model("cart", cartSchema);


module.exports = { Cart };