import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    coverimage: {
      type: String,
    },
    watchhistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshtoken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.ispasswordcorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.createaccesstoken = function () {
  return jwt.sign(
    { _id: this._id,
       email: this.email,
        username: this.username,
        fullname: this.fullname,
       },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    }
  );
};
userSchema.methods.createrefreshtoken = function () {
  return jwt.sign(
    { id: this._id },
     process.env.REFRESH_TOKEN_SECRET, 
     {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  });
};
const User = mongoose.model("User", userSchema);
export default User;
