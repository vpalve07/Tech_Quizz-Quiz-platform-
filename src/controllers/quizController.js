const quizModel = require("../models/quizModel")
const quizRegModel = require("../models/quizRegModel")
const quizQuesModel = require("../models/quizQuesModel")

const quiz = async function(req,res){
    try{
        let data = req.body
        let createQuiz = await quizModel.create(data)
        return res.status(201).send({status:true,data:createQuiz})
    }catch(error){
        return res.status(500).send({ status: false, msg: error.message })
    }
}

const regQuiz = async function(req,res){
    try{
        let data = req.body
        data.quizId = req.params.quizId
        data.userId = req.params.userId
        if(data.score) return res.status(400).send({status:false,msg:"You can not set score"})
        let register = await quizRegModel.create(data)
        return res.status(201).send({status:true,data:register})
    }catch(error){
        return res.status(500).send({ status: false, msg: error.message })
    }
}

const quizQuestions = async function(req,res){
    try{
        let data =req.body
        let quizId = req.params.quizId
        data.quizId = quizId
        let questions = await quizQuesModel.create(data)
        return res.status(201).send({status:true,data:questions})
    }catch(error){
        return res.status(500).send({ status: false, msg: error.message })
    }
}

module.exports = {quiz,regQuiz,quizQuestions}