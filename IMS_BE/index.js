import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import userrouter from './routes/userRoute.js';
import teamRoutes from "./routes/teamRoutes.js";
import fileUpload from 'express-fileupload';
import cloudinaryConnection from './config/cloudinary.js';
import connectdb from './config/connectDB.js';
dotenv.config()

const app = express()
app.use(cors())
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp', 
}));
const port = process.env.PORT || 5000 ;
app.use(express.json());

app.use('/api/user',userrouter)
app.use("/api/teams", teamRoutes);
cloudinaryConnection();
app.listen(port,()=>{
     console.log("server is running")
     connectdb();
 }) 

