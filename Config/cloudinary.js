const cloudinary = require("cloudinary").v2
          
exports.cld = ()=>{

 return cloudinary.config({ 
  cloud_name: 'dhfas7qft', 
  api_key: '764883466786642', 
  api_secret: 'O_01fc2aNtArlLkrpBn0YmIBQRk' 
});
}