import mongoose, { Mongoose } from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fprofile-pic&psig=AOvVaw0L7t0PY8CjizLANOnvXHEK&ust=1760290175416000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKiNvonWnJADFQAAAAAdAAAAABAE"

    },


},{timestamps:true});

const User = mongoose.model('User', userSchema);

export default User;