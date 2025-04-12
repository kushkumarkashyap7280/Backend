import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY, 
  
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadtoCloudinary = async (filePath) => {
  try {
    if (!filePath) {
      return null;
    };
    // Upload the file to Cloudinary
    const uploadedfile = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto"
    });
    // Remove the file from local storage after upload
    if(uploadedfile) {
      fs.unlinkSync(filePath);
      return uploadedfile.secure_url;
    };
   
  } catch (error) {
    fs.unlinkSync(filePath); // Ensure the file is deleted even if upload fails
    console.error("Error uploading to Cloudinary:", error);
    return null;
     
  }
};

export { uploadtoCloudinary };
