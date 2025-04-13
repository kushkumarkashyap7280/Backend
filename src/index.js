import { connectDB } from "./db/connectDB.js";
import dotenv from "dotenv";
import { app } from "./app.js";
dotenv.config(
    {path: './.env'}
);




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
