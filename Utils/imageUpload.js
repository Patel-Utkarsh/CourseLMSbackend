const cloudinary = require("cloudinary").v2
exports.cloudUpload = async (file,folder,height,quality) => {
    let options = {folder};

    if(height) {
        options.height = height;
    }

    if(quality) {
        options.quality = quality
    }

    options.resource_type = 'auto';
    //console.log(file);

    return await cloudinary.uploader.upload(file.tempFilePath,options);

}