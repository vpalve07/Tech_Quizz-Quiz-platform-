const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const register = new mongoose.Schema({
    quizId:{
        type:ObjectId,
        ref:"Quiz"
    },
	userId:{
        type:ObjectId,
        ref:"User"
    },
	name:{
        type:String,
        required:true
    },
	score:{
        type:Number,
        default:0
    },
	startTime:{
        type:Date,
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model('RegisterQuiz', register)