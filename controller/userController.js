import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { ErrorHandler } from "../middlewares/error.js";
import User from "../models/userSchema.js";
import { v2 as cloudinary } from "cloudinary";

export const registerUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      password,
      role,
      firstNiche,
      secondNiche,
      thirdNiche,
      coverletter,
    } = req.body;

    if (!name || !email || !phone || !address || !password || !role) {
      return next(new ErrorHandler("please enter all fields", 400));
    }
    if (User === "jobseeker" && (!firstNiche || !secondNiche || !thirdNiche)) {
      return next(new ErrorHandler("please provide your all niches", 400));
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new ErrorHandler("user already exists", 400));
    }
    const userData = {
      name,
      email,
      phone,
      address,
      password,
      role,
      niches: {
        firstNiche,
        secondNiche,
        thirdNiche,
      },
      coverletter,
    };

    if (req.files && req.files.resume) {
      const { resume } = req.files;
      if (resume) {
        try {
          const cloudinaryResponse = await cloudinary.uploader.upload(
            resume.tempFilePath,
            {
              folder: "job-seeker-resume",
            }
          );
          if (!cloudinaryResponse || cloudinaryResponseerror) {
            new ErrorHandler("cloudinary error", 400);
          }
          userData.resume = {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
          };
        } catch (error) {
          return next(new ErrorHandler("failed to upload resume", 400));
        }
      }
    }
    const user = await User.create(userData);
    res.status(201).json({
      sucess: true,
      message: "user created successfully",
    });
  } catch (error) {
    next(error);
  }
});
