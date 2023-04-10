const mongoose = require("mongoose")

const user = new mongoose.Schema({
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
    type:{
        type:String,
        enum:['jobSeeker','organizer'],
        required:true
    },
    currentCompony:{
        type:String
    },
    secretQuestion:{
        question:{
            type:String,
            required:true
        },
        answer:{
            type:String,
            required:true
        }
    }
        
},{timestamps:true})

module.exports = mongoose.model("User",user)