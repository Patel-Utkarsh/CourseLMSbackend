const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name : {
        type  : String,
        required : true
    },

    email : {
        type : String,
        required : true
    },

    password : {
        type : String,
        required : true
    },

    account_type : {
        type : String,
        enum : ["admin","student","instructor"],
        required : true
    },

    profile : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Profile"
    },

    token : {
        type : String,
    },

    reset_pass_expiry : {
        type  : Date,
    },

    coursesAsInstructor : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Courses"
        }
    ],


    courses : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Courses"

        }
       
    ],

    courseProgress : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "CourseProgress"
        }
    ],

    cart : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Courses"

        }
    ]






    

})

module.exports = mongoose.model('User',schema);