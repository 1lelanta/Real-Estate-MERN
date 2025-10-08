import bcrypt from 'bcryptjs'

import User from "../models/userModel.js";
import errorHandler from '../utils/error.js';
const signup = async(req,res, next)=>{
    const {username, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = new User({username, email, password:hashedPassword});

    try {
        await newUser.save();
        res.status(200).json('user created successfully');
    } catch (error) {
        next(errorHandler(550, 'error from the function'));
    }
    
}

export default signup;


