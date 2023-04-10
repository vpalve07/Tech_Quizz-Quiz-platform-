const quizModel = require("../../models/quizModel")
const quizRegModel = require("../../models/quizRegModel")
const quizQuesModel = require("../../models/quizQuesModel")
const {isValidAnswer,isValidQuestion} = require("../../validations/validations");

const quiz = async function(req,res){
    try{
        let data = req.body
        if(!data.quizName) return res.status(400).send({ status: false, msg: "quizName is mandatory" })
        if(!data.quizType) return res.status(400).send({ status: false, msg: "quizType is mandatory" })
        if(!data.timeLimit) return res.status(400).send({ status: false, msg: "timeLimit is mandatory" })
        if(!data.topicTags) return res.status(400).send({ status: false, msg: "topicTags is mandatory" })
        if(!data.totalScore) return res.status(400).send({ status: false, msg: "totalScore is mandatory" })

        if (!isValidAnswer(data.quizName)) return res.status(400).send({ status: false, message: "quizName is Invalid and can only contain 30 characters" });

        let quizTypeEnum = quizModel.schema.obj.quizType.enum
        if (!quizTypeEnum.includes(data.quizType)) {
           return res.status(400).send({ status: false, msg: "quizType should be 'MCQ' only" })
        }

        if(!Number(data.timeLimit)) return res.status(400).send({ status: false, msg: "timeLimit should be in numerical only" })
        
        if(Number(data.topicTags)) return res.status(400).send({ status: false, msg: "topicTags can not be number only" })

        if(!Number(data.totalScore)) return res.status(400).send({ status: false, msg: "totalScore should be in numerical only" })

        data.userId = req.decode.userId
        data.totalScore = 0
        let createQuiz = await quizModel.create(data)
        return res.status(201).send({status:true,QuizId:createQuiz._id,Message:`${data.quizName} created successfully`})
    }catch(error){
        return res.status(500).send({ status: false, msg: error.message })
    }
}

const regQuiz = async function(req,res){
    try{
        let data = {}
        let findQuiz = await quizModel.findOne({_id:req.params.quizId,isActive:true,isDeleted:false})
        if(!findQuiz) return res.status(400).send({status:false,Message:"Quiz not found for registration"})
        data.quizId = req.params.quizId
        data.userId = req.decode.userId
        if(data.score) return res.status(400).send({status:false,msg:"You can not set score"})
        let create = await quizRegModel.create(data)
        return res.status(201).send({status:true,Message:"Quiz registration is successful"})
    }catch(error){
        return res.status(500).send({ status: false, msg: error.message })
    }
}

const quizQuestions = async function(req,res){
    try{
        let data =req.body
        let quizId = req.params.quizId
        if(!quizId) return res.status(400).send({status:false,Message:"quizId is mandatory"})
        if(!data.question) return res.status(400).send({status:false,Message:"question is mandatory"})
        if(!data.ans) return res.status(400).send({status:false,Message:"answer is mandatory"})

        if(Object.entries(data.options).length==0) return res.status(400).send({status:false,Message:"options are mandatory"})
        let keys = Object.keys(data.options).length
        let values = Object.values(data.options).length
        for(let i of Object.keys(data.options)){if(!Number(i)) return res.status(400).send({status:false,Message:"all options keys should be numerical ones"})}
        if((keys<4||keys>5)&&(values<4||values>5)) return res.status(400).send({status:false,message:"Options can be minimum 4 or maximum 5"})
        // if (!isValidQuestion(data.question)) return res.status(400).send({ status: false, message: "question is Invalid and can only contain 1000 characters" });

        if(!Object.keys(data.options).includes(data.ans)) return res.status(400).send({status:false,Message:"Answer should be given from options only"})
        let findQuiz = await quizModel.findOne({_id:quizId})
        if(!findQuiz) return res.status(400).send({status:false,Message:"Quiz not found"})
        if(findQuiz.userId!=req.decode.userId) return res.status(400).send({status:false,Message:"You don't have authorization to create a quiz and its questions"})
        data.quizId = quizId
        if(!data.marks||data.marks<=0) return res.status(400).send({status:false,message:"marks are required and should be greater than 0"})
        
        let updateScore = await quizModel.findOneAndUpdate({_id:quizId},{$inc:{totalScore:data.marks}},{new:true})

        let questions = await quizQuesModel.create(data)
        return res.status(201).send({status:true,QuestionId:questions._id,Message:"Question created successfully"})
    }catch(error){
        return res.status(500).send({ status: false, msg: error.message })
    }
}

const activate = async function(req,res){
    try{
        let quizId = req.params.quizId
        let findQuizQues = await quizQuesModel.find({quizId:quizId})
        if(findQuizQues.length<=5) return res.status(400).send({status:false,Message:"Minimum 5 questions should be registered in this quiz to activate it"})
        let activateQuiz = await quizModel.findOneAndUpdate({_id:quizId,isDeleted:false,isActive:false},{isActive:true},{new:true})
        if(!activateQuiz) return res.status(400).send({status:false,Message:"Quiz is either already activated or does not exist"})
        return res.status(200).send({status:true,message:"Quiz is activated"})
    }catch(error){
        return res.status(500).send({ status: false, msg: error.message })
    }
}

const updateQuiz = async function(req,res){
    try{
        let quizId = req.params.quizId
        let data = req.body
        let obj = {}
        if (data.quizName&&!isValidAnswer(data.quizName)) return res.status(400).send({ status: false, message: "quizName is Invalid and can only contain 30 characters" });
        let quizTypeEnum = quizModel.schema.obj.quizType.enum
        if (data.quizType&&!quizTypeEnum.includes(data.quizType)) {
           return res.status(400).send({ status: false, msg: "quizType should be 'MCQ' only" })
        }
        if(data.timeLimit&&!Number(data.timeLimit)) return res.status(400).send({ status: false, msg: "timeLimit should be in numerical only" })
        if(data.topicTags&&Number(data.topicTags)) return res.status(400).send({ status: false, msg: "topicTags can not be number only" })

        if(data.quizName!=""){
            obj.quizName = data.quizName
        }
        if(data.quizType!=""){
            obj.quizType = data.quizType
        }
        if(data.timeLimit!=""){
            obj.timeLimit = data.timeLimit
        }
        if(data.topicTags!=""){
            obj.topicTags = data.topicTags
        }
        let findQuiz = await quizModel.findOneAndUpdate({_id:quizId,isDeleted:false},obj,{new:true})
        if(!findQuiz) return res.status(400).send({status:false,Message:"Quiz not found"})
        return res.status(200).send({status:true,message:"Quiz updated successfully"})
    }catch(error){
        return res.status(500).send({ status: false, msg: error.message })
    }
}

module.exports = {quiz,regQuiz,quizQuestions, activate, updateQuiz}