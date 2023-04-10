const userModel = require("../../models/userModel")
const quizRegModel = require("../../models/quizRegModel")

const leaderboard = async function(req,res){
    try {
        let quizId = req.params.quizId
        let findApplicants = await quizRegModel.find({quizId:quizId,isAttempted:true}).populate('userId',{name:1, email:1, currentCompony:1,_id:0}).sort({score:-1}).select({'score':1,"_id":0})
        if(findApplicants.length==0) return res.status(404).send({ status: false, msg: "data not available for this quiz" })
        return res.status(200).send({status:true,data:findApplicants})
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

module.exports = {leaderboard}