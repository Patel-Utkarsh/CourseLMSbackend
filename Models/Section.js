const mongoose = require("mongoose");

const schema = mongoose.Schema({
    sectionName : {
        type  : String,
        required : true
    },

    subSection : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "subSection"
    }],

  

})

module.exports = mongoose.model('Section',schema);