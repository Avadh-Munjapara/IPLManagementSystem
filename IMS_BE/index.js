import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import userrouter from './routes/userRoute.js';
import playerRouter from './routes/playerRoute.js';
import teamRouter from './routes/teamRoutes.js';

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const port = process.env.PORT || 5000 ;

app.use('/api/user',userrouter)
app.use('/api/player',playerRouter)
app.use('/api/team',teamRouter)

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
    
})
