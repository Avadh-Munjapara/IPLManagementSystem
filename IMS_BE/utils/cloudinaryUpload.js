import { v2 as cloudinary } from "cloudinary";
const imageUpload=async(file,folder,height,quality)=>{
  try {
    let options={
        folder,
        resource_type:"image",
    }
    if(height){
        options.height=height;      
    }
    if(quality){
        options.quality=quality;
    }
    const upload=await cloudinary.uploader.upload(file.tempFilePath,options);
    return upload;
  } catch (error) {
      console.log('something went wrong while uploading image', error);
  }
}

export default imageUpload;