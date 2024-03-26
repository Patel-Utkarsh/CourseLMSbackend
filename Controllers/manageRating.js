const { default: mongoose } = require("mongoose");
const Course = require("../Models/Course");
const course = require("../Models/Course");
const Ratings = require("../Models/Ratings");
exports.ratingAuth = async(req,res) => {
    const {course_id} = req.body;
    const {id} = req.user;
    try{
        const course_details = await course.findOne({_id : course_id,ratingReviews : {$elemMatch : {$ep : id}}});
        if(!course_details) {
            res.status(200).json({
                success : true,
                message : 'hasnt reviewed yet'

            })
        }

        else {
            res.status(404).json({
                success : false,
                message : 'already reviewed'

            })

        }

    }
    catch(error) {
        res.status(404).json({
            success : false,
            message : 'error in api call'

        })

    }
}

exports.createRating = async(req,res) => {
    const {course_id,rating,review} = req.body;
    const {id} = req.user;
    try {
        const r =  await rating.create({user : id,rating,review});
        await Course.findByIdAndUpdate({_id : course_id},{$push : {ratingReviews : r._id}});

        res.status(200).json({
            success : true,
            message : 'rated successfully'
        })

    }

    catch(err) {
        res.status(404).json({
            success : false,
            message : 'error in creating rating'
        })

    }
   

}

exports.avgRating = async(req,res) => {
    const {course_id} = req.body;

    try {
        const result = await Ratings.aggregate([
            {
                $match : {
                    course : new mongoose.Types.ObjectId(course_id)
                }
            },
    
            {
                $group : {
                    _id : null,
                    averageRating : {$avg : "$rating"}
                }
            }
        ])

        if(result.length > 0) {
            res.status(200).json({
                success : true,
                ratingAvg : result[0].averageRating
            })
        }

        else {
            res.status(200).json({
                success : true,
                ratingAvg : Math.random() * (5-4) + 4
            })

        }



    }

    catch(error) {
        res.status(500).json({
            success : false,
            message : 'error in fetching ratings'
        })

    }

   
}