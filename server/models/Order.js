const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    userid: {
        type: String,
        required: true,

    },
    addressid: {
        type: Array,
        required: true,

    },
    products: {
        type: Array,
        required: true
    },
    grandtotal: {
        type: Number,
        required: true,

    },
    statusOrder: {
        type: String,
        required: true,
    },
    paymentmethod: {
        type: String,
        required: true
    },
    deliveredDate: {
        type: Date,
        default: null,
    },
    createdAt:
    {
        type: Date,
        default: Date.now,
    },



}, { timestamps: true });

const Order = mongoose.model("order", orderSchema);


module.exports = { Order };