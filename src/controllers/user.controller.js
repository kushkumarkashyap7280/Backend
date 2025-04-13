import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import { uploadtocloudinary } from "../utils/cloudinary.js";

const registeruser = asyncHandler(async (req, res) => {

  // Check if the request body contains all required fields
  const { username, email, fullname, password } = req.body;
  if (!username || !email || !fullname || !password) {
    throw new apiError(400, "All fields are required");
  }
  // Check if the user already exists
  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  // If the user already exists, throw an error
  if (existingUser) {
    throw new apiError(409, "User with Email or Username already exists");
  }
  // get the file names from the request
  const avatarlocalpath = req.files?.avatar[0]?.path;
  let coverimagelocalpath ;
  if (req.files && Array.isArray(req.files.coverimage) && req.files.coverimage.length > 0) {
    coverimagelocalpath = req.files?.coverimage[0]?.path;
  }


  // console.log("avatarlocalpath", avatarlocalpath);
  // console.log("coverimagelocalpath", coverimagelocalpath);

  // Check if the avatar and cover image are provided
  if (!avatarlocalpath) {
    throw new apiError(400, "Avatar is required");
  }

  //upload the avatar and cover image to Cloudinary
  const avatar = await uploadtocloudinary(avatarlocalpath);
  const coverimage = await uploadtocloudinary(coverimagelocalpath);

  // console.log("avatar", avatar);
  // console.log("coverimage", coverimage);

  if (!avatar) {
    throw new apiError(500, "Failed to upload avatar to Cloudinary");
  };

  //create a new user
 const user = await User.create({
    username : username.toLowerCase(),
    email : email.toLowerCase(),
    fullname,
    password,
    avatar :avatar.secure_url ,
    coverimage : coverimage?.secure_url || "",
  });
  // Check if the user was created successfully
  if (!user) {
    throw new apiError(500, "Failed to create user");
  };  
   
  // Send a success response with the created user data
  const createdUser = await User.findById(user._id).select("-password -refreshtoken");

  if (!createdUser) {
    throw new apiError(500, "something went wrong , please try again later");
  };
  // Send a success response with the created user data
  res.status(201).json(new apiResponse(201, createdUser, "User created successfully"));

});

export { registeruser };
