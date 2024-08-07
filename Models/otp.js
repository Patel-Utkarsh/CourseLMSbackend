const mongoose = require("mongoose");

const schema = mongoose.Schema({
    email : {
        type : String,
        required : true,
    },

    otp : {
        type : String,
        required : true,
    },

    createdAt : {
        type : Date,
        default : Date.now(),
        expires : 5*60,
    },



})

module.exports = mongoose.model('otp',schema);