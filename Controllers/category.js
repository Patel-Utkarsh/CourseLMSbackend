
const Category = require("../Models/category");
const dbConnect = require("../Config/dbConnect");

exports.createcategory = async(req,res) => {
    
    const {category,description} = req.body;

    try{
    
        const createcategory = await Category.create({name : category,description});
        res.status(200).json({
            success : true,
            message  : 'category created Successfully'
        })

    }

    catch(err) {
        res.status(500).json({
            success : false,
            message  : err.message
        })


    }

}

exports.viewCategories = async (req,res) =>{
    try{
        const category = await Category.find({});
                                

        res.status(200).json({
            success : true,
            data : category,
            message  :'category fetched Successfully'
        })
        


    }

    catch(err){

        
        res.status(500).json({
            success : false,
            message  : err.message
        })

    }
}

exports.specificCategory = async(req,res) => {
    const {category_id} = req.body;

    try {
        const myCat = await Category.findById({_id : category_id})
                                            .populate("course")
                                            .exec();

        res.status(200).json({
            success : true,
            data : myCat
        })
        
    } 
    catch (error) {
        res.status(500).json({
            success : true,
            message : 'unable to fetch data'
        })
        
    }
}
