const express = require('express')
const route = require('./route/route')
const mongoose = require('mongoose')
const multer = require('multer')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(multer().any())

mongoose.connect("mongodb+srv://vinayakpalve02:z9OX588H2PzlY9aR@cluster0.8zhdvsn.mongodb.net/fsocDB", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDB is connected"))
    .catch(err => console.log(err))

app.use("/", route)
app.listen(3000, function () {
    console.log("Express app running on port 3000")
})