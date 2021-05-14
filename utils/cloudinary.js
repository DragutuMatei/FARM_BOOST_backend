require("dotenv").config();

// import { v2 as cloud } from "cloudinary";

const cloud = require("cloudinary").v2;
  
cloud.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = { cloud };
