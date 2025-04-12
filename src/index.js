import { connectDB } from "./db/connectDB.js";
import dotenv from "dotenv";
dotenv.config(
    {path: './.env'}
);


import { app } from "./app.js";

connectDB()
  .then(() => {
    app
      .listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
      })
      .on("error", (err) => {
        console.error("Error starting the server:", err);
        process.exit(1);
      });
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
    process.exit(1);
  });
