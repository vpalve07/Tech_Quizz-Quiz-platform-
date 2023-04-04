const mongoose = require("mongoose")

const quiz = mongoose.Schema({
    quizName:{
        type:String,
        required:true
    },
	quizType:{
        type:String,
        enum:['MCQ','etc']
    },
	quizTime:{
        type:Number,
        required:true
    },
    // startTime:{
    //     type:Date,
    //     required:true
    // },
    // endTime:{
    //     type:Date,
    //     required:true
    // },
	compName:{
        type:String,
        required:true
    },
	topicTags:{
        type:[String],
        required:true
    },
	totalScore:{
        type:Number,
        required:true
    }

},{timestamps:true})

module.exports = mongoose.model("Quiz",quiz)