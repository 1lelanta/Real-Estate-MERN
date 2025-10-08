import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoute from './routes/userRoute.js';
import userAuth from './controllers/signupController.js';
dotenv.config();
const app = express();

app.use(express.json())

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('mongoDB is connected');
}).catch((err)=>{
    console.log(err)
});

const PORT = process.env.PORT||3000;

app.listen(PORT, ()=>{
    console.log(`server is running on http://localhost:${PORT}`)

})

app.use('/api/user', userRoute);
app.use('/api/auth', userAuth);


app.use((err,req,res,next)=>{
    const statusCode = err.statusCode|| 500;
    const message = err.message||"internal server error";
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})