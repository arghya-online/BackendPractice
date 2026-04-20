import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import ApiResponse from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  //Step 1: destructure the request body
  //Step 2: check if all the fields are present or not
  //Step 3: check if user already exists or not
  //Step 4: check for images and files
  //Step 5: Upload the images to cloudinary and get the secure url
  //Step 6: hash the password
  //Step 7: save the user to the database
  //Step 8: create user object - creaate entry in db
  //Step 9: remove password and refresh token from the user object
  //Step 10: generate token
  //Step 11: send response to the client

  //Step 1: getting the data from the request body
  const { fullName, fullname, name, email, username, password } = req.body;
  const resolvedFullName = fullName ?? fullname ?? name;
  console.log("registerUser body:", { ...req.body, password: "********" });
  console.log(`User ${resolvedFullName} is registered with ${email}`);

  //Step 2: check if all the fields are present or not
  if (!username || !email || !password || !resolvedFullName) {
    throw new apiError(400, "All fields are required");
  }

  //Step 3: check if user already exists or not
  //User.findOne() is used to find a user with the given email in the database.
  const existedUser = await User.findOne({
    $or: [{ email }, { username }],
  });
  console.log(existedUser);
  if (existedUser) {
    throw new apiError(400, "User already exists");
  }

  //Step 4: check for images and files
  //req.files?.avatar?.[0]?.path
  const avatarLocalPath = req.files?.avatar?.[0]?.path ?? null;
  const coverPhotoLocalPath = req.files?.coverPhoto?.[0]?.path ?? null;
  console.log(avatarLocalPath);
  console.log(coverPhotoLocalPath);

  if (!avatarLocalPath || !coverPhotoLocalPath) {
    throw new apiError(400, "Avatar and cover photo are required");
  }

  //Step 5: Upload the images to cloudinary and get the secure url
  const avatar = await uploadToCloudinary(avatarLocalPath);
  const coverPhoto = await uploadToCloudinary(coverPhotoLocalPath);
  console.log(avatar);
  console.log(coverPhoto);

  if (!avatar?.secure_url || !coverPhoto?.secure_url) {
    throw new apiError(500, "Error uploading images to Cloudinary");
  }

  //Step 7: save the user to the database
  //Step 8: create user object - create entry in db
  const user = await User.create({
    fullName,
    fullName: resolvedFullName,
    email,
    username: username.toLowerCase().trim(),
    password,
    avatar: avatar.secure_url,
    coverPhoto: coverPhoto.secure_url,
  });

  //It is used to find a user by their ID in the database and return the user object.
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  if (!createdUser) {
    throw new apiError(500, "Error creating user");
  }

  //Step 11: send response to the client
  return res
    .status(201)
    .json(new ApiResponse(201, "User created successfully", createdUser));
});

export { registerUser };
