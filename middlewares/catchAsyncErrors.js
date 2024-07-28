import { promises } from "nodemailer/lib/xoauth2";

export const catchAsyncErrors = (fn) => {
  return (req, res, next) => {
    // fn(req, res, next).catch(next);
    Promise.resolve(fn(req, res, next)).catch(error);
  };
};

//Middlewares are used to handle repetitive tasks
//  (like logging, authentication, and error handling)
//  and to modularize code. Common middlewares include request
// logging, JSON parsing, authentication, and error handling.

