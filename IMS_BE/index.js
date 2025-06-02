import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import userrouter from './routes/userRoute.js';

dotenv.config()

const app = express()
app.use(cors())

const port = process.env.PORT || 5000 ;

app.use('/api/user',userrouter)

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
    
})
