import mongoose from "mongoose";

//Interview Note: Models convert into plural form and small letters, so it will be "users" in the database.
// For example a mode named "User" will be stored in the database as "users".

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: {
        value: 6,
        message: "Password should be at least 6 characters long",
      },
    },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
