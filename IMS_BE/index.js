import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import userrouter from './routes/userRoute.js';
import fileUpload from 'express-fileupload';
import cloudinaryConnection from './config/cloudinary.js';
import connectdb from './config/connectDB.js';
import teamRouter from './routes/teamRoutes.js';
import playerRouter from './routes/playerRoute.js';
dotenv.config()

const app = express()
app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true 
}))
// app.use(fileUpload({
//     useTempFiles:true,
//     tempFileDir:'./uploads', 
// }));
const port = process.env.PORT || 5000 ;
app.use(express.json());
cloudinaryConnection();

app.use('/api/user',userrouter)
app.use("/api/team", teamRouter);
app.use('/api/player',playerRouter)
app.listen(port,()=>{
     console.log("server is running")
     connectdb();
 }) 

