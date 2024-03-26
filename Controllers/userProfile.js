const Profile = require("../Models/Profile");

exports.updateUserProfile = async(req,res) => {
    const {gender,dob,contactNo,about,id} = req.body;

 

    try{
      const data =   await Profile.findByIdAndUpdate({_id : id},{gender : gender,dob : dob,contactNo : contactNo,about : about},{new : true});

        res.status(200).json({
            success : true,
            message : 'data edited successfully',
    

            
        })



    }

    catch(err){
        res.status(500).json({
            success : false,
            message : 'error in updating data'

            
        })

    }
}

