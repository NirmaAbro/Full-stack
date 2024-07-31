import app from "./app.js";
import { config } from "dotenv";
import cloudinary from "cloudinary";



config({ path: "./config/config.env" });

const PORT = process.env.PORT || 5000;

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, //cloudinary cloud name
  api_key: process.env.CLOUDINARY_API_KEY, //cloudinary api key
  api_secret: process.env.CLOUDINARY_API_SECRET, //cloudinary api secret
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

