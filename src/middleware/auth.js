const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const quizModel = require("../models/quizModel")
const quizRegModel = require("../models/quizRegModel")
const redis = require("redis")
const { promisify } = require("util")
require('dotenv').config()

const client = redis.createClient({
  url: process.env.redis_url
});

client.on('error', (err) => console.log('Redis Client Error', err));
console.log("Connected to Redis..");

//2. Prepare the functions for each command

const SET_ASYNC = promisify(client.SETEX).bind(client);
const GET_ASYNC = promisify(client.GET).bind(client);
const TTL_ASYNC = promisify(client.TTL).bind(client);

const objectIdCheck = function (req, res, next) {
  try {
    if (req.params.quizId && !mongoose.isValidObjectId(req.params.quizId)) return res.status(400).send({ status: false, message: "Invalid quizId" })
    next()
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message })
  }
}

const validateToken = function (req, res, next) {
  try {
    let token = req.headers['x-api-key']
    if (!token) return res.status(400).send({ status: false, message: "Token is required" })
    jwt.verify(token, process.env.secret_key, function (err, decode) {
      if (err) return res.status(400).send({ status: false, message: "Authentication Failed" })
      req.decode = decode
      next()
    })
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message })
  }
}

const organizerAuth = function (req, res, next) {
  try {
    if (req.decode.type != 'organizer') return res.status(400).send({ status: false, message: "You don't have authorization to create a quiz and its questions" })
    next()
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message })
  }
}

const timer = async function (req, res, next) {
  const quizId = req.params.quizId;
  const userId = req.decode.userId;
  if (req.start == "start") {
    let findQuiz = await quizModel.findOne({_id:quizId})
    if(!findQuiz) return res.status(400).send({status:false,message:"Quiz Id is missing"})
    let time = findQuiz.timeLimit
    let attempted = await quizRegModel.findOne({ userId: userId, quizId: quizId })
    if (!attempted) return res.status(400).send({ status: false, message: "You haven't registered for this quiz" })
    if (attempted.isAttempted == true) return res.status(400).send({ status: false, message: "You have already attempted this quiz" })
    await SET_ASYNC(`${userId}-${quizId}`, time * 60, `${quizId}`)        //${{userId},{quizId}}
    next()
  }
  else {
    let expiry = await TTL_ASYNC(`${userId}-${quizId}`)
    if (expiry <= 0) {
      let findQuiz = await quizModel.findById(quizId)
      let findQuizReg = await quizRegModel.findOne({ quizId: quizId, userId: userId })
      let obj = {}
      obj.totalQuizScore = findQuiz.totalScore
      obj.myTotalScore = findQuizReg.score
      obj.totalCorrectAnswer = findQuizReg.correctAns
      obj.totalWrongAnswer = findQuizReg.wrongAns
      obj.totalQuestions = findQuizReg.totalQueAttempted+findQuizReg.totalQueUnAttempted
      obj.totalQuestionsAttempted = findQuizReg.totalQueAttempted
      return res.status(200).send({ status: true, data:obj})
    }
    next()
  }
}


module.exports = { objectIdCheck, validateToken, organizerAuth, timer }