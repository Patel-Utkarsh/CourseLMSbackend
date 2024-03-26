const mongoose = require("mongoose");

const schema = mongoose.Schema({
    courseName : {
        type : String,
       required : true
    },

    courseDescription : {
        type : String,
       required : true
    },

    instructor : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },

    whatWillyouLearn : {
        type : String,
       required : true
    },

  
    courseContent : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Section"
    }],

    ratingReviews : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "ratingReviews"
    }],

    price : {
        type : String,
       required : true
    },

    thumbnail : {
        type : String,
       required : true
    },

    category : 
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "category"
        }
    ,


    studentEnrolled : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "users"
        }
    ],

    published : {
        type : String,
        enum : [true,false],
        required : true

    }







})

module.exports = mongoose.model('Courses',schema);