const { url } = require("inspector");
const User = require("../Models/User");
const crypto = require('crypto');
const { nodeMailer } = require("../Utils/nodeMailer");
exports.forgetPass = async(req,res)=>{

    const {email} = req.body;
    try {
        let validUser = await User.findOne({email});
        if(!validUser) {
          return  res.status(500).json({
            success : false,
            message  : 'user doesnt exist'

            })
        }
     
        const token = await crypto.randomUUID();
      
        const url = `http://localhost:3000/update-password/${token}`;
        validUser = await User.findOneAndUpdate({email},{token : token,reset_pass_expiry : Date.now() + 5 * 60 * 1000},{new : true})

        await nodeMailer(email,'Reset link',url);

        res.status(200).json({
            success : true,
            message : 'reset link sent successfully'
        })



        


    }

    catch(err) {
        res.status(500).json({
            success : false,
            message : 'error in sending reset pass link'
        })



    }
}

exports.resetPass = async (req,res) => {
    const {token,password} = req.body;
    const brcypt = require("bcrypt");

    try {
        let validUser = await User.findOne({token});

        if(!validUser)  {
            return res.status(500).json({
                success : false,
                message : 'Invalid token/user'
            })
        }
    
        if(validUser.reset_pass_expiry < Date.now()) {
            return res.status(500).json({
                success : false,
                message : 'token expired'
            })
    
        }
    
        //Updation of Records
    
       // const newPass = await brcypt.hash(password,10);
        validUser = await User.findOneAndUpdate({token},{password : password},{new : true});
        res.status(200).json({
            success : true,
            message : 'Password Changed Successfully'
    
        })

    }

    catch(err){
        res.status(500).json({
            success : false,
            message :  `error in resetting password ${err.message}`
    
        })

    }

    

  


}