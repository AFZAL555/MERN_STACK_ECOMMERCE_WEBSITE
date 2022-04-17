const mongoose = require( "mongoose" );

const couponSchema = new mongoose.Schema( {
    couponname: {
        type: String,
        required: true,
    },
    userId: {
        type: Array,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    minamount: {
        type: Number,
        required: true,
    },
    minpurchase: {
        type: Number,
        required: true,
    },
    expireAt: {
        type: Date,
        expires: 0,
        default: Date.now,
    }
},
    { timestamps: true } );

const Coupon = mongoose.model( "coupon", couponSchema );


module.exports = { Coupon };