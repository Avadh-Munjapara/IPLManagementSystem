import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        default:""
    },
    role:{
        type:String,
       enum:["USER","PLAYER","TEAMOWNER","ADMIN"],
        default:"USER"
    }
    
})

const userModel = mongoose.model("User",userSchema)

export default userModel;