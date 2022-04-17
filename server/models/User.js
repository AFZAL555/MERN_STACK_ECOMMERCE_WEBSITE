const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true

    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    status: {
        type: String,
        default: true
    },
    referralcode:{
        type:String,
        required:true,
    },
    wallet:{
        type:Number,
        required:false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }


});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ id: this.id }, process.env.JWTPRIVATEKEY, { expiresIn: "7d" });
    return token
};
const User = mongoose.model("User", userSchema);

module.exports = { User }; 