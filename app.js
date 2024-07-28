import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { connection } from "./database/connection.js";
import cookieParser from "cookie-parser"; 
import { errorMiddleware } from "./middlewares/error.js";
// import fileUpload from "express-fileupload";
// import userRouter from "./routes/userRoutes.js";


const app = express();
config({ path: "./config/config.env" });

//frontend ko backend sa connect krna hai
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,  //sing credentials: true in a CORS (Cross-Origin Resource Sharing) configuration has the purpose of allowing the server to accept requests that include user credentials. Credentials can include cookies, authorization headers

  })
);
// app.use("/api/v1/register", userRouter);



app.use(cookieParser());   //agr jwt token ko access krna ha jabhi hum ya middleware use krrhy hn 
app.use(express.json());  //ITS our midlleware to parse json data , es ki help sa hme ya mallon hoga k hume kis value ko parse karna hai r hme values kis type ki milrhi hn 
app.use(express.urlencoded({ extended: true })); 

// app.use(fileUpload({
//   useTempFiles: true,
//   tempFileDir: "/tmp/",
// }))

// now third step is to connect database 
connection();
app.use( errorMiddleware );

export default app;
