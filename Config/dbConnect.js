const dbConnect = async(req,res) =>{
    const mongoose = require("mongoose");
    
        await mongoose.connect('mongodb+srv://utkarshp04:ySRIE8PyN4xskPII@cluster0.nuzes1o.mongodb.net/studyNotion',{
            useNewUrlParser  :false,
            useUnifiedTopology : false
        })

        .then(()=>{
            console.log('db connected successfully');

        })

        .catch((error)=>{
            console.log(error);
        })
        

}

module.exports = dbConnect;