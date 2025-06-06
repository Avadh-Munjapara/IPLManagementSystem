import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv'
dotenv.config()

cloudinary.config({
    cloud_name : process.env.CLOUDNAME,
    api_key : process.env.APIKEY,
    api_secret : process.env.APISECRET
})


const uploadimageclodinary = async (image) => {
    try {
        const buffer = image?.buffer || Buffer.from(await image.arrayBuffer());

        const uploadImage = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: "IMS" },(error, uploadResult) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(uploadResult);
                }
            );
            uploadStream.end(buffer);
        });
        return uploadImage;

    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;  
    }
};
    
export default uploadimageclodinary