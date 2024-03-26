const { default: mongoose } = require("mongoose");
const Course = require("../Models/Course");
const { instance } = require("../Config/razorpay");
const User = require("../Models/User");

exports.createOrder = async(req,res) =>{
    const {id} = req.user;
    const {course_id} = req.body;

    try {

        const uid = new  mongoose.Types.ObjectId(id);

        if(await Course.studentEnrolled.includes(uid)) {
            res.status(500).json({
                success  : false,
                message  : 'Course already bought by user'
            })
        }

        const courseDetails = await Course.findById(course_id);

        const amount = courseDetails.price;
        const currency = "INR";

        const options  = {
            amount : amount * 100,
            currency,
            receipt : Math.random(Date.now()).toString(),
            notes : {
                courseId : course_id,
                userId : id
            }
        }

        try{
            const paymentResponse = await instance.orders.create(options);
            res.status(200).json({
                success  : true,
                courseName : courseDetails.courseName,
                courseDes : courseDetails.courseDescription,
                thumbnail  :courseDetails.thumbnail,
                orderId : paymentResponse.id,
                currency : paymentResponse.currency,
                amount : paymentResponse.amount
            })

        }

        catch(err){
            res.status(500).json({
                success  : false,
                message  : 'failed in interacting with razorpay'
            })
            

        }





    }

    catch(err){
        res.status(500).json({
            success  : false,
            message  : 'failed in creating an order'
        })

    }
}

exports.verifySignature = async(req,res) => {
    const webHookSecret = "123456789";
    const signature = req.headers["x-razorpay-signature"];
    const shasum = crypto.createHmac("sha256",webHookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    try{
        if(signature === digest) {
            console.log('payment is authorized');
    
            const {courseId,userId} = req.body.payload.payment.entity.notes;
    
            await User.findByIdAndUpdate({id : userId},{$push:{courses : courseId}});
            await Course.findByIdAndUpdate({id : courseId},{$push:{studentEnrolled : userId}});
            res.status(200).json({
                success  : true,
                message  : 'payment made successfully'
            })
            
    
        }

    }

    catch(err) {
        res.status(500).json({
            success  : false,
            message  : 'order coulnt be placed'
        })

    }

    
}