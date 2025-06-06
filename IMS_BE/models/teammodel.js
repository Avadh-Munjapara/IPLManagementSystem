import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    tag_line:{
        type:String,
        default:""
    },
    state:{
        type:String,
        required:true
    },
    logo:{  
        type:String,
        default:""
    },
    short_name:{
        type:String,
        default:""
    },
    captain:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    squad:[{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    }],
    owners:[{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    }],
    
})
const teamModel = mongoose.model("Team",teamSchema);
export default teamModel ;

