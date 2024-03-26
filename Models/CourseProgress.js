const mongoose = require("mongoose");

const schema = mongoose.Schema({
    course_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Courses"
    },

    completed_videos :[ {
        type : mongoose.Schema.Types.ObjectId,
        ref : "subSection"
    }]


})

module.exports = mongoose.model('CourseProgress',schema);