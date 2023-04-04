const express = require('express')
const route = require('./route/route')
const mongoose = require('mongoose')
const multer = require('multer')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(multer().any())

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true
})
    .then(() => console.log("MongoDB is connected"))
    .catch(err => console.log(err))

app.use("/", route)
app.listen(process.env.PORT, function () {
    console.log("Express app running")
})