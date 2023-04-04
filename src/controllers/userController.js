const userModel = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const user = async function (req, res) {
    try {
        let data = req.body
        const saltRounds = data.password.length
        let hash = await bcrypt.hash(data.password, saltRounds)
        data.password = hash
        let createUser = await userModel.create(data)
        return res.status(201).send({ status: true, data: createUser })
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

const login = async function (req, res) {
    try {
        let data = req.body
        let { email, password } = data
        if (!email) return res.status(400).send({ status: false, msg: "email id is required for login" })
        if (!password) return res.status(400).send({ status: false, msg: "password is required for login" })
        let userData = await userModel.findOne({ email: email, isDeleted: false });
        if(!userData) return res.status(404).send({ status: false, message: "no user found with this email" })
        bcrypt.compare(password, userData.password, (err, pass) => {
            if (err) throw err
            if (pass) {
                let token = jwt.sign({ userId: userData._id.toString(), emailId: userData.email },"group5californium")
                res.setHeader("x-api-key", token)
                return res.status(200).send({ status: true, message: "User login successfull"})
            }else{
                return res.status(400).send({ status: false, message: "Password is wrong" })
              }
        })
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

module.exports = { user, login }