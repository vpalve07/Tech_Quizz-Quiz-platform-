const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

const objectIdCheck = function(req,res,next){
    try {
        let data = req.body
        if(data.quizId&&!mongoose.isValidObjectId(data.quizId)) return res.status(400).send({status:false,msg:"Invalid quizId"})
        if(req.params.quizId&&!mongoose.isValidObjectId(req.params.quizId)) return res.status(400).send({status:false,msg:"Invalid userId"})
        if(req.params.userId&&!mongoose.isValidObjectId(req.params.userId)) return res.status(400).send({status:false,msg:"Invalid commentId"})
        next()
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

module.exports = {objectIdCheck}