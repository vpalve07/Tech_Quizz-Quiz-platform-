const quizQuesModel = require("../../models/quizQuesModel")
const quizRegModel = require("../../models/quizRegModel")
const quizModel = require("../../models/quizModel")



const startQuiz = async function(req,res){
    try {
        let quizId = req.params.quizId
        let findQuiz = await quizModel.findOne({_id:quizId,isActive:true,isDeleted:false})
        let time = findQuiz.timeLimit
        if(!findQuiz) return res.status(404).send({status:false,message:"Quiz not found"})
        let findRegUser = await quizRegModel.findOneAndUpdate({userId:req.decode.userId,quizId:quizId},{isAttempted:true},{new:true})
        if(!findRegUser) return res.status(404).send({status:false,message:"You haven't registered for this quiz"})
        // await SET_ASYNC(`${req.decode.userId}-${req.params.quizId}`, time*60, `${req.params.quizId}`)
        return res.status(200).send({status:true,message:"Quiz is starting",time:time})
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const questions = async function(req,res){
    try {
        let quizId = req.params.quizId
        let page = req.query.page        //*page-1
        let userId = req.decode.userId
        if(Object.entries(req.body).length>0){
        if(req.body.questionId!=""&&req.body.answer!=""&&req.body.marks>0){
            let checkAns = await quizQuesModel.findOne({_id:req.body.questionId,quizId:quizId}).lean()
            if(!checkAns) return res.status(400).send({status:false,message:"Quiz Question not found"})
            let answer = Object.entries(checkAns.options)
            let finalAns = answer[checkAns.ans-1][1]
            if(req.body.answer==finalAns){
                let updateScore = await quizRegModel.findOneAndUpdate({quizId:quizId,userId:userId},{$inc: { score: req.body.marks , correctAns:1, totalQueAttempted:1}},{new:true})
            }else{
                let updateScore = await quizRegModel.findOneAndUpdate({quizId:quizId,userId:userId},{$inc: { wrongAns:1,totalQueAttempted:1}},{new:true})
            }
        }
        if(req.body.questionId!=""&&req.body.answer==""&&req.body.marks>0){
            let updateUnAttempted = await quizRegModel.findOneAndUpdate({quizId:quizId,userId:userId},{$inc: { totalQueUnAttempted:1}},{new:true})
        }
    }
        let findQuestions = await quizQuesModel.find({quizId:quizId}).skip(1*page-1).limit(1).select({question:1,options:1,marks:1})    //_id:0

        if(findQuestions.length==0) return res.status(404).send({status:false,message:"Quiz completed"})
        // res.setHeader("questionId", findQuestions_id)
        return res.status(200).send({status:true,message:"question",data:findQuestions})
        
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const submit = async function(req,res){
    try {
        const quizId = req.params.quizId
        const userId = req.decode.userId
        let findQuiz = await quizModel.findById(quizId)
        let findQuizReg = await quizRegModel.findOne({quizId:quizId,userId:userId})
        let obj = {}
        obj.totalQuizScore = findQuiz.totalScore
        obj.myTotalScore = findQuizReg.score
        obj.totalCorrectAnswer = findQuizReg.correctAns
        obj.totalWrongAnswer = findQuizReg.wrongAns
        // obj.totalQuestions = findQuizReg.totalQueAttempted+findQuizReg.totalQueUnAttempted
        obj.totalQuestionsAttempted = findQuizReg.totalQueAttempted
        return res.status(200).send({status:true,data:obj})
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


// totalQuizScore
// totalScore
// totalCorrectAnswer
// totalWrongAnswer
// totalQuestions
// totalQuestionsAttempted

module.exports = {startQuiz,questions,submit}