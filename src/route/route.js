const express = require('express')
const { user, login, forgotPass, updateUser } = require('../controllers/userController')
const { quiz, regQuiz, quizQuestions } = require('../controllers/quizController')
const router = express.Router()

router.get("/test_me", function (req, res) {
    return res.send({msg:"API working"})
})

router.post("/user",user)

router.post("/login",login)

router.post("/forgotPass",forgotPass)

router.post("/update/:userId",updateUser)

router.post("/quiz",quiz)

router.post("/regQuiz/:quizId/:userId",regQuiz)

router.post("/quizQue/:quizId",quizQuestions)

module.exports = router