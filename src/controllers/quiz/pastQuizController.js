const quizRegModel = require("../../models/quizRegModel")
const quizModel = require("../../models/quizModel")

const jobSeekerQuizzes = async function(req,res){
    try {
        let findQuizes = await quizRegModel.find({userId:req.decode.userId}).populate('quizId',{isActive:1,quizName:1,quizType:1,timeLimit:1,topicTags:1,totalScore:1,_id:0}).sort({updatedAt:-1}).select({score:1,_id:0})
        if(findQuizes.length==0) return res.status(404).send({ status: false, message: "No past quizzes" })
        return res.status(200).send({status:true,data:findQuizes})
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const organizerQuizzes = async function(req,res){
    try {
        let findQuizes = await quizModel.find({userId:req.decode.userId}).select({quizName:1,quizType:1,timeLimit:1,topicTags:1,totalScore:1,isActive:1,_id:1}).sort({updatedAt:-1})
        if(findQuizes.length==0) return res.status(404).send({ status: false, message: "No past quizzes" })
        return res.status(200).send({status:true,data:findQuizes})
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = {jobSeekerQuizzes, organizerQuizzes}