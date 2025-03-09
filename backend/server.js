import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import userRouter from "./routes/userRoute.js";
import doctorRouter from "./routes/doctorRoute.js";


//APP CONFIG
const app=express();
const port=process.env.PORT || 4000;

//MIDDLEWARES

app.use(express.json())
app.use(cors())
connectDB()
connectCloudinary()


//API ENDPOINTS

app.use('/api/admin',adminRouter) 

app.use('/api/doctor',doctorRouter)

app.use('/api/user',userRouter) 

app.get("/",(req,res)=>{
    res.send("hello")
})


app.listen(port,()=>{
    console.log("server is start",port);
})


