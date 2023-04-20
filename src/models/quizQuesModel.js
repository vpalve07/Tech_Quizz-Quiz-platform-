const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const ques = new mongoose.Schema({
    quizId:{
        type:ObjectId,
        ref:'Quiz'
    },
	question:{
        type:String,
        required:true
    },
	options:{
        type:Map,
        of:String,
        required:true
    },
	ans:{
        type:Number,
        required:true
    },
    marks:{
        type:Number,
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model("QuizQuestions",ques)