import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/db.js";

dotenv.config({
  path: "./.env",
});

const app = express();

//approach 1
/*(async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}`);
    app.on("error", (error) => {
      console.log("Error connecting to MongoDB:", error);
      throw error;
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
})();
*/

//approach 2

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8080, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});
