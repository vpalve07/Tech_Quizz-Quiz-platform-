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
	op1:{
        type:String,
        required:true
    },
	op2:{
        type:String,
        required:true
    },
	op3:{
        type:String,
        required:true
    },
	op4:{
        type:String,
        required:true
    },
	ans:{
        type:String,
        required:true
    },
	TimeLimit:{
        type:Number,
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model("QuizQuestions",ques)