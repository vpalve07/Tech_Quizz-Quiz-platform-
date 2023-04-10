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
        // required:true
    },
	score:{
        type:Number,
        default:0
    },
    isAttempted:{
        type:Boolean,
        default:false
    },
	correctAns:{
        type:Number,
        default:0
    },
    wrongAns:{
        type:Number,
        default:0
    },
    totalQueAttempted:{
        type:Number,
        default:0
    },
    totalQueUnAttempted:{
        type:Number,
        default:0
    }
},{timestamps:true})

module.exports = mongoose.model('RegisterQuiz', register)