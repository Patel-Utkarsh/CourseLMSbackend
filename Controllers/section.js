const Course = require("../Models/Course");
const Section = require("../Models/Section");

exports.createSection = async (req,res) => {
    const  {sectionName,courseId} = req.body;
 
    const section = Section;
    const course = Course;

    try {

        const newSection = await section.create({sectionName});
        await course.findByIdAndUpdate({_id : courseId},{$push:{courseContent : newSection._id}});

        res.status(200).json({
            id : newSection._id,
            success : true,
            message : 'New Section added successfully'
         

            
        })





    }

    catch(err) {

        res.status(500).json({
            success : false,
            message : 'New Section couldnt be added',
            additionalMessage : err.message

            
        })

    }
}

exports.updateSection = async(req,res) =>{
    const {editSection,sectionId} = req.body;

    try {
        await Section.findByIdAndUpdate(sectionId,{sectionName : editSection});
        res.status(200).json({
            success : true,
            message : 'Section edited successfully'

            
        })
    }

    catch(err) {

        res.status(500).json({
            success : false,
            message : err.message

            
        })

    }
}

exports.deleteSection = async (req,res) => {
    const {sectionId} = req.body;


    try {
        await Section.findByIdAndDelete(sectionId);
        res.status(200).json({
            success : true,
            message : 'Section deleted successfully'

            
        })

    }

    catch(err) {
        res.status(500).json({
            success : true,
            message : 'error in deletin section'

            
        })

    }

    
  



}