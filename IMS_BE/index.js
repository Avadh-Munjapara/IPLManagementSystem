import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import userRouter from './routes/userRoute.js';
import connectdb from './config/ConnectDB.js';

dotenv.config()

const app = express()
const port = process.env.PORT || 8000 ;
app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))


app.use('/api/user',userRouter)

app.listen(port,()=>{
     console.log("server is running")
     connectdb();
 }) 

