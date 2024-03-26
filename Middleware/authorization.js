const jwt = require("jsonwebtoken");

//Data validation

exports.auth = async (req,res,next) =>{
    

    try {

        const token =  req.cookies.tokenCookie || req.body.token;
        //console.log(token)
 
        if(!token) {
            return res.status(500).json({
                success  : false,
                message : 'Couldnt Authorize'

            })
        }

        const decode = await jwt.verify(token,'secret');
        req.user = decode;
        next();


    }

    catch(err) {
        res.status(500).json({
            success  : false,
            message : err

        })

    }


}

// isStudent

exports.isStudent = async(req,res,next) =>{
    const role = req.user.role;


    if(role != 'student') {
       return  res.status(500).json({
            success  : false,
            message : 'Unauthorized access'

        })
    }
    
    res.status(200).json({
        success  : true,
        message : 'welcome to student dashboard'

    })

    next();
}

//isInstructor

exports.isInstructor = async(req,res,next) =>{
    const role = req.user.role;


    if(role != 'instructor') {
       return  res.status(500).json({
            success  : false,
            message : 'Unauthorized access'

        })
    }

    res.status(200).json({
        success  : true,
        message : 'welcome to instructor dashboard'

    })

    next();
}

//isAdmin

exports.isAdmin = async(req,res,next) =>{
    const role = req.user.role;


    if(role != 'admin') {
       return  res.status(500).json({
            success  : false,
            message : 'Unauthorized access'

        })
    }

    res.status(200).json({
        success  : true,
        message : 'welcome to admin dashboard'

    })

    next();
}