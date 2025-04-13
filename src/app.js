import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors(
  //   {
  //   origin: process.env.FRONTEND_URL, // or your frontend domain
  //   credentials: true, // to allow cookies to be sent
  // }
)
);

// 2. Parse cookies from incoming requests
app.use(cookieParser());

// 3. Built-in JSON parser (also early)
app.use(express.json({ limit: "16kb" }));

// 4. URL-encoded parser (for form submissions)
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // 16kb limit for URL-encoded data
app.use(express.static("public")); // Serve static files from the "public" directory

import userRouter from "./routes/user.routes.js";
app.use("/api/v1/user", userRouter);

export { app };
