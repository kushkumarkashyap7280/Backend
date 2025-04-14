import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import apiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";


const verifyJwtAcesssToken = asyncHandler(async (req, _, next) => {
  console.log("req.cookies", req.cookies);
 try {
   const token = req.cookies?.accessToken || req.headers?.authorization?.split(" ")[1];
   if (!token) {
     return next(new apiError(401, "Unauthorized"));
   }
   const decodedtoken =  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
 
   if (!decodedtoken) {
     return next(new apiError(401, "Unauthorized"));
   }
   const user = await User.findById(decodedtoken._id).select("-password -refreshtoken");
   if (!user) {
     return next(new apiError(401, "Unauthorized"));
   }
   req.user = user;
   next();
 } catch (error) {
   return next(new apiError(401, "Unauthorized"));
  
 }
});


export { verifyJwtAcesssToken };