const { default: mongoose } = require("mongoose");
const Course = require("../Models/Course");
const { instance } = require("../Config/razorpay");
const User = require("../Models/User");


exports.createOrder = async (req, res) => {
    const { id, course_id } = req.body;

    try {
        let sum = 0;
        if (Array.isArray(course_id)) {
            for (const element of course_id) {
                const uid = new mongoose.Types.ObjectId(element._id);
                sum += parseInt(element.price);

                const courseDetails = await Course.findById(element._id);

                if (courseDetails.studentEnrolled.includes(id)) {
                    return res.status(500).json({
                        success: false,
                        message: 'Course already bought by user'
                    });
                }
            }
        } else {
            const uid = new mongoose.Types.ObjectId(id);
            const courseDetails = await Course.findById(course_id);

            if (courseDetails.studentEnrolled.includes(id)) {
                return res.status(500).json({
                    success: false,
                    message: 'Course already bought by user'
                });
            }

            sum = parseInt(courseDetails.price);
        }

        const amount = sum;
        const currency = "INR";

        const options = {
            amount: amount * 100,
            currency,
            receipt: Math.random(Date.now()).toString(),
            notes: {
                userId: id
            },
        };

        const paymentResponse = await instance.orders.create(options);
        res.status(200).json({
            success: true,
            options: {
                name: Array.isArray(course_id) ? 'Courses' : courseDetails.courseName,
                image: Array.isArray(course_id) ? undefined : courseDetails.thumbnail,
                orderId: paymentResponse.id,
                currency: paymentResponse.currency,
                amount: paymentResponse.amount,
                key: 'rzp_test_wstLCIqX2bkcId',
                notes: options.notes
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


exports.verifySignature = async (req, res) => {


    try {


        const { courseId, userId } = req.body;

        if (Array.isArray(courseId)) {
            courseId.forEach(async (element) => {
                await User.findByIdAndUpdate({ _id: userId }, { $push: { courses: element._id } });
                await Course.findByIdAndUpdate({ _id: element._id }, { $push: { studentEnrolled: userId } });


            })
            res.status(200).json({
                success: true,
                message: 'payment made successfully'
            })
        }

        else {

            await User.findByIdAndUpdate({ _id: userId }, { $push: { courses: courseId } });
            await Course.findByIdAndUpdate({ _id: courseId }, { $push: { studentEnrolled: userId } });
            res.status(200).json({
                success: true,
                message: 'payment made successfully'
            })

        }

    }

    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })

    }


}
