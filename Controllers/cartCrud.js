
const user = require('../Models/User');
exports.AddToCart = async(req,res) => {
    const {id,course_id} = req.body;
    try {
        await user.findByIdAndUpdate({_id : id},{$push : {cart : course_id}});
        res.status(200).json({
            success : true,
            message : 'item added to cart'
        })
    }

    catch(err) {
        res.status(500).json({
            success : false,
            message : 'item couldnt be  added to cart'
        })

    }
    


}

exports.DeleteFromCart = async(req,res) => {
    const {id,course_id} = req.body;
    try {
        await user.findByIdAndUpdate({_id : id},{$pull : {cart : course_id}});
        res.status(200).json({
            success : true,
            message : 'item removed from cart'
        })
    }

    catch(err) {
        res.status(500).json({
            success : false,
            message : 'item couldnt be removed from cart'
        })

    }
    

}
