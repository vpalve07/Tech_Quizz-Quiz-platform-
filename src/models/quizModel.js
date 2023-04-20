const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const quiz = mongoose.Schema({
    quizName:{
        type:String,
        required:true
    },
    userId:{
        type:ObjectId,
        ref:"User"
    },
	quizType:{
        type:String,
        enum:['MCQ']
    },
	timeLimit:{
        type:Number,
        required:true
    },
	topicTags:{
        type:[String],
        required:true
    },
	totalScore:{
        type:Number,
        default:0
    },
    isActive:{
        type:Boolean,
        default:false
    },
    isDeleted:{
        type:Boolean,
        default:false
    }

},{timestamps:true})

quiz.virtual('timeLimitInMinutes').get(function() {
    return this.timeLimit / 60;
});

module.exports = mongoose.model("Quiz",quiz)