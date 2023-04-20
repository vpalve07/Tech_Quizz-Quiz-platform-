const express = require('express')
const route = require('./route/route')
const mongoose = require('mongoose')
const multer = require('multer')
require('dotenv').config()
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(multer().any())

app.use(cors({origin:"*"}))
mongoose.connect(process.env.mongo_url, {useNewUrlParser: true})
    .then(() => console.log("MongoDB is connected"))
    .catch(err => console.log(err))

app.use("/", route)
app.listen(process.env.port, function () {
    console.log(`Express app running on ${process.env.port}`)
})