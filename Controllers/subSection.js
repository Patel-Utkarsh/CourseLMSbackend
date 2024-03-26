const Section = require("../Models/Section");
const Subsection = require("../Models/Subsection");
const { cloudUpload } = require("../Utils/imageUpload");

exports.createSubsection = async (req,res) => {

    const {title,sectionId} = req.body;
    const video = req.files.file;


    try{
        const vid =  await cloudUpload(video,"Home");
        //console.log(vid);
        const newSub =  await Subsection.create({title : title, video_url : vid.secure_url});
        await Section.findByIdAndUpdate(
            sectionId,
            { $push: { subSection: newSub._id } },
            { new: true } 
        );

        res.status(200).json({
            success : true,
            message : 'SubSection added successfully'

            
        })
     
     

    }

    catch(err) {
        res.status(500).json({
            success : false,
            message : err.message
            
        })
    }
    
}

exports.updateSubsection = async(req,res) => {
    
    const {title,subSectionId} = req.body;
    console.log(title,subSectionId);
    const video = req.files && req.files.video ? req.files.video : null ;

    try{
        let updateObj = {};
        if(title!=null) updateObj.title = title;
       

        if(video!=null) {
            const vid =  await cloudUpload(video,"Home");
            updateObj.video_url = vid.secure_url;

        }
        
        const newSub =  await Subsection.findByIdAndUpdate(subSectionId,{title : updateObj.title,video_url : updateObj.secure_url},{new : true});
        

        res.status(200).json({
            success : true,
            message : 'SubSection edited successfully',


            
        })
     
     

    }

    catch(err) {
        res.status(500).json({
            success : false,
            message : err.message

            
        })
    }
    

}

exports.getSubSectionData = async(req,res) =>{
    const {subSectionId} = req.body;

    try {
        const data = await Subsection.findById(subSectionId);
        res.status(200).json({
            success : true,
            message : 'SubSection data fetched successfully',
            data

            
        })

    }

    catch(err) {
        res.status(500).json({
            success : false,
            message : 'error in fetching subsection data'

            
        })

    }
    
}

exports.deleteSubsection = async(req,res) => {
    const {subSectionId} = req.body;

    try {
        await Subsection.findByIdAndDelete( subSectionId);
        res.status(200).json({
            success : true,
            message : 'SubSection deleted successfully'

            
        })

    }

    catch(err) {
        res.status(500).json({
            success : false,
            message : 'error in deleting subsection'

            
        })

    }
    


}