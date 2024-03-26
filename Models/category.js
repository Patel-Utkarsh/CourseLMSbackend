const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name : {
        type : String,
       required : true
    },

    description : {
        type : String,
       required : true
    },

    course : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Courses"
    }],

    
})

module.exports = mongoose.model('category',schema);