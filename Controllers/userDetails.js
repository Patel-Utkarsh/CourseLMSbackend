const user = require('../Models/User');
exports.getUserDetails = async (req,res) =>{
    const {id} = req.body;

    try{
        const data = await user.findById({_id : id})
                        .populate("profile")

                        .populate({
                            path : "courses",
                            populate : {
                                path : "courseContent",
                                populate : {
                                    path : "subSection"


                                }
                            }
                        })
                        .populate({
                            path : "coursesAsInstructor",

                            populate : {
                                path : "courseContent",
                                populate : {
                                    path : "subSection"

                                }


                            }
                        })
                        .populate("cart")
                        .exec();

        res.status(200).json({
            success : true,
            data
        })

    }

    catch(err) {
        res.status(500).json({
            success : false,
            message : err.message
        })
    }



}