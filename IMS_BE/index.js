const express=require('express');
const userRoutes=require('./routes/userRoute');
const playerRoutes=require('./routes/playerRoute');
const teamRoutes=require('./routes/teamRoutes');
const app=express();

app.use('/api/v1/users',userRoutes);
app.use('/api/v1/player',playerRoutes);
app.use('/api/v1/team',teamRoutes);
app.listen(8000,()=>{
    console.log("Server is running on port 8000");
})