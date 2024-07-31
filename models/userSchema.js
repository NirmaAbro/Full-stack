import { Mongoose } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";

const userSchema = new Mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Your Name"],
        maxLength:[30,"Name cannot exceed 30 characters"],
        minLength:[4,"Name should have more than 4 characters"]
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:[validator.isEmail,"Please Enter a valid Email"]
    },
    phone:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    niches:{
        firstNiche:String,
        secondNiche:String,
        thirdNiche:String 
        // fourthNiche:String
    },
    password:{
        type:String,
        required:[true,"Please Enter Your Password"],
        minLength:[8,"Password should be greater than 8 characters"],
        maxLength:[32,"Password should be less than 32 characters"],
        // select:false
    },
    resume:{
        public_id:String,
        url:String
    },
    coverletter:{
       type:String
    },
    role:{
        type:String,
        required:true,
        enum :["jobseeker","Employer"],
        // default:"jobseeker"
    },
    createdAt:{
        type:Date,
        default:Date.now

    },
});


export const User = Mongoose.model("User",userSchema)