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
app.use('/api/auth', userAuth)