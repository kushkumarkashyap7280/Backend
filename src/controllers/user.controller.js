import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import { uploadtocloudinary } from "../utils/cloudinary.js";

// function which send userdata but without password and refreshtoken
const senduserdata = (user) => {
  return {
    _id: user._id,
    username: user.username,
    email: user.email,
    fullname: user.fullname,
    avatar: user.avatar,
    coverimage: user.coverimage,
    watchhistory: user.watchhistory,
  };
};

// function which generate access token and refresh token for the user

const generateAccessAndRefreshTokens = async (user) => {
  try {
    const accessToken = user.createaccesstoken();
    const refreshToken = user.createrefreshtoken();

    user.refreshtoken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error generating tokens:", error);
    throw new apiError(500, "Internal server error");
  }
};

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
  // console.log("req---------------", req);
  // console.log("req.files--------------", req.files);
  // get the file names from the request
  const avatarlocalpath = req.files?.avatar[0]?.path;
  let coverimagelocalpath;
  if (
    req.files &&
    Array.isArray(req.files.coverimage) &&
    req.files.coverimage.length > 0
  ) {
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
  }

  //create a new user
  const user = await User.create({
    username: username.toLowerCase(),
    email: email.toLowerCase(),
    fullname,
    password,
    avatar: avatar.secure_url,
    coverimage: coverimage?.secure_url || "",
  });
  // Check if the user was created successfully
  if (!user) {
    throw new apiError(500, "Failed to create user");
  }

  // Send a success response with the created user data
  const createdUser = await User.findById(user._id).select(
    "-password -refreshtoken"
  );

  if (!createdUser) {
    throw new apiError(500, "something went wrong , please try again later");
  }
  // Send a success response with the created user data
  res
    .status(201)
    .json(new apiResponse(201, createdUser, "User created successfully"));
});

const loginuser = asyncHandler(async (req, res) => {
  // take credientials from the request body
  console.log("req.body", req.body);
  const { email, username, password } = req.body;
  if (!email && !username) {
    throw new apiError(400, "Email or Username is required");
  }
  if (!password) {
    throw new apiError(400, "Password is required");
  }
  // check if the user exists in the database by email or username
  const user = await User.findOne({
    $or: [
      email ? { email: email.toLowerCase() } : null,
      username ? { username: username.toLowerCase() } : null,
    ].filter(Boolean), // remove nulls
  });

  // if user not found throw an error
  if (!user) {
    throw new apiError(401, "Invalid credentials");
  }
  // check if the password is correct using the ispasswordcorrect method in the user model
  const ispasswordcorrect = await user.ispasswordcorrect(password);
  // if password is not correct throw an error
  if (!ispasswordcorrect) {
    throw new apiError(401, "Invalid credentials");
  }
  // create access token and refresh token using the methods in the user model
  const { accessToken, refreshToken } =
    await generateAccessAndRefreshTokens(user);
  // userdata without password and refreshtoken
  const userdata = senduserdata(user);

  // send the access token and refresh token in the response
  return res
    .status(200)
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 60 * 60 * 1000, // 1 hour
    })
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    })
    .json(
      new apiResponse(
        200,
        { ...userdata, isLoggedin: true },
        "User logged in successfully"
      )
    );
});

const logoutuser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    { $set: { refreshtoken: null } },
    { new: true }
  );

  // clear the cookies from the response
  res
    .clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    })
    .clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    })
    .json(
      new apiResponse(
        200,
        { isLoggedin: false },
        "User logged out successfully"
      )
    );
});

export { registeruser, loginuser, logoutuser };
