const mongoose = require("mongoose");
const schema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },

    timeDuration : {
        type : String,
       
    },

    description : {
        type : String,
     
    },

    video_url : {
        type : String,
        required : true
    },

    additional_url : {
        type : String,

    }

})

module.exports = mongoose.model('subSection',schema)