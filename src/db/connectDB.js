import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


export const connectDB = async () => {
  try {
  const connection =  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

    console.log("Database connected successfully:", connection.connection.host);
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1); // Exit the process with failure
    
  }
};