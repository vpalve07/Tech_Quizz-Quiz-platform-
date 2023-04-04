const express = require('express')
const { user, login } = require('../controllers/userController')
const router = express.Router()

router.get("/test_me", function (req, res) {
    console.log("api is working")
})

router.post("/user",user)

router.post("/login",login)

module.exports = router