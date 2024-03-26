const mongoose = require("mongoose");

const schema = mongoose.Schema({
    user : {
        type : String,
       required : true
    },

    rating : {
        type : Number,
       required : true
    },

    review : {
        type : String,
        required : true
    },

    
})

module.exports = mongoose.model('ratingReviews',schema);