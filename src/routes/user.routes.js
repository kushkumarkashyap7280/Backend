import express from "express";
import {
  registeruser,
  loginuser,
  logoutuser,
  refreshaccesstoken,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwtAcesssToken } from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.post(
  "/register",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverimage", maxCount: 1 },
  ]),
  registeruser
);

userRouter.post("/login", loginuser);

userRouter.get("/logout", verifyJwtAcesssToken, logoutuser);

userRouter.post("/refreshtoken", refreshaccesstoken);

export default userRouter;
