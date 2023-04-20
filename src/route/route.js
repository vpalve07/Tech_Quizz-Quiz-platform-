const express = require('express')
const { user, login, forgotPass, updateUser, resetPass, userDetails } = require('../controllers/user/userController')
const { quiz, regQuiz, quizQuestions, activate, updateQuiz } = require('../controllers/quiz/quizController')
const { validateToken, organizerAuth, objectIdCheck, timer } = require('../middleware/auth')
const { leaderboard } = require('../controllers/leaderboard/leaderboardController')
const { jobSeekerQuizzes, organizerQuizzes } = require('../controllers/quiz/pastQuizController')
const { ongoingQuizzes } = require('../controllers/quiz/ongoingController')
const { startQuiz, questions, submit } = require('../controllers/quiz/startQuizController')
const router = express.Router()

router.get("/health-check", function (req, res) {
    return res.send({message:"API working"})
})

router.post("/signUp",user)

router.post("/login",login)

router.get('/userDetails', validateToken, userDetails)

router.post("/forgotPass",forgotPass)

router.post("/resetPassword",resetPass)

router.post("/update", validateToken, updateUser)

router.post("/quiz", validateToken, organizerAuth, quiz)

router.post("/updateQuiz/:quizId", objectIdCheck, validateToken, organizerAuth, updateQuiz)

router.post("/regQuiz/:quizId", objectIdCheck, validateToken, regQuiz)

router.post("/quizQue/:quizId", objectIdCheck, validateToken, organizerAuth, quizQuestions)

router.post("/activateQuiz/:quizId", objectIdCheck, validateToken, organizerAuth, activate)

router.get("/leaderboard/:quizId", objectIdCheck, validateToken, leaderboard)

router.get("/userQuizzes", validateToken, jobSeekerQuizzes)

router.get("/organizerQuizzes", validateToken, organizerAuth, organizerQuizzes)

router.get("/ongoingQuizzes", validateToken, ongoingQuizzes)

router.get("/startQuiz/:quizId", (req,res,next)=>{req.start = "start"; next()}, objectIdCheck, validateToken, timer, startQuiz)

router.post("/question/:quizId", objectIdCheck, validateToken, timer, questions)

router.get("/submit/:quizId", objectIdCheck, validateToken, submit)

router.all("/*",function(req,res){res.status(404).send({status:false,message:"Invalid HTTP request"})})

module.exports = router