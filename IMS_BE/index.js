import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import userrouter from './routes/userRoute.js';
import teamRoutes from './routes/teamRoutes.js'

dotenv.config()

const app = express();
app.use(cors());

const port = process.env.PORT || 5000 ;

app.use('/api/user',userrouter);
app.use('/api/v1/teams',teamRoutes);
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
    
})
