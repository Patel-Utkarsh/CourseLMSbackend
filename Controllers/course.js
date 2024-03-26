//onst Course = require("../Models/Course");
const Courses = require("../Models/Course");
const User = require("../Models/User");
const Category = require("../Models/category");

exports.createCourse = async (req,res) =>{
    //console.log(1111);

    try{
        
        const {courseName,courseDescription,whatWillyouLearn,price,category,published,id} = req.body;
        const myImg = req.files.file;
        
        const {cloudUpload} = require("../Utils/imageUpload");
       const thumbImg =  await cloudUpload(myImg,"Home");
      
       const validCategory = await Category.findOne({name : category});
        const createCourse = await Courses.create({courseName,courseDescription,instructor : id,whatWillyouLearn,price,thumbnail : thumbImg.secure_url,category : validCategory._id,published});
        const updateUser = await User.findByIdAndUpdate({_id : id},{$push : {coursesAsInstructor : createCourse._id  }},{new : true});
        const updateCategory = await Category.findByIdAndUpdate({_id : validCategory._id},{$push : {course : createCourse._id}},{new : true});

        res.status(200).json({
            success : true,
            message : 'Course created successfully'
        })
    }

    catch(err){

        res.status(500).json({
            success : false,
            message : err.message
        })


    }
    

    

}


exports.showAllCourse = async (req,res) =>{
    try{

        const courses = await Courses.find({})
       
       
        .populate("instructor")
        .populate({
            path: "courseContent",
            populate: {
                path: "subSection"
            }
        })
        // .populate("ratingReviews")
        .populate("category")
        .exec();

        res.status(200).json({
            success : true,
            courses

        })

    }

    catch(err) {

        res.status(500).json({
            success : false,
            message : err.message

        })


    }
}


exports.viewSingleCourse = async(req,res) => {
    const  {courseId} = req.params;


    try{
        const courseDeatails = await Courses.findById({_id : courseId})
        .populate("instructor")
        .populate({
            path: "courseContent",
            populate: {
                path: "subSection"
            }
        })
        // .populate("ratingReviews")
        .populate("category")
        .exec();
        
        res.status(200).json({
            success : true,
            courseData : courseDeatails
        })

    }

    catch(err){
        res.status(500).json({
            success : false,
            message : 'couldnt fetch data'
        })

    }
}