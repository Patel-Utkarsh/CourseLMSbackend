const { default: mongoose } = require("mongoose");
const Course = require("../Models/Course");
const { instance } = require("../Config/razorpay");
const User = require("../Models/User");

exports.createOrder = async(req,res) =>{
  
    const {id,course_id} = req.body;
;

    try {

        const uid = new  mongoose.Types.ObjectId(id);
       // console.log(uid)

        const courseDetails = await Course.findById(course_id);

        if(await courseDetails.studentEnrolled.includes(course_id)) {
            res.status(500).json({
                success  : false,
                message  : 'Course already bought by user'
            })
        }

       
       // console.log(courseDetails)

        const amount = courseDetails.price;
        const currency = "INR";

        const options  = {
            amount : amount * 100,
            currency,
            receipt : Math.random(Date.now()).toString(),
            notes : {
                courseId : course_id,
                userId : id
            },

            
        }

        try{
            const paymentResponse = await instance.orders.create(options);
            res.status(200).json({
                success  : true,
                options : {
                    name : courseDetails.courseName,
                    image  :courseDetails.thumbnail,
                    orderId : paymentResponse.id,
                    currency : paymentResponse.currency,
                    amount : paymentResponse.amount,
                    key : 'rzp_test_wstLCIqX2bkcId',
                    notes : options.notes

                }
               
            })

        }

        catch(err){
            res.status(500).json({
                success  : false,
                message  : err.message
            })
            

        }





    }

    catch(err){
        res.status(500).json({
            success  : false,
            message  : err.message
        })

    }
}

exports.verifySignature = async(req,res) => {
 

    try{
        
            console.log('payment is authorized');
    
            const {courseId,userId} = req.body;
    
            await User.findByIdAndUpdate({_id : userId},{$push:{courses : courseId}});
            await Course.findByIdAndUpdate({_id : courseId},{$push:{studentEnrolled : userId}});
            res.status(200).json({
                success  : true,
                message  : 'payment made successfully'
            })
            
    
        

    }

    catch(err) {
        res.status(500).json({
            success  : false,
            message  : err.message
        })

    }

    
}
