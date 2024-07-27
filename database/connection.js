import { mongoose } from "mongoose";

export const connection = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      dbName: "job-portal",
    })
    .then(() => {
      console.log("database connected");
    })
    .catch((error) => {
      console.log(error);
    });
};
