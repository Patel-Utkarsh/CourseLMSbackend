const mongoose = require("mongoose");

const schema = mongoose.Schema({
    gender : {
        type : String,
    },

    dob : {
        type : String,
    },

    contactNo : {
        type : String,
    },

    about : {
        type : String,

    },


})

module.exports = mongoose.model('Profile',schema);