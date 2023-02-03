const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Note = require('./models/Note');

const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json())

mongoose.set('strictQuery', true);

mongoose.connect("mongodb+srv://poppy:poppy@cluster0.egrx7q7.mongodb.net/notesdb") .then(function(){
    console.log("db connected")
    
});

// routes
app.get("/status" ,function(req,res){
    const response = { message: "Server online 🚀" };
    res.json(response);
});

const noteRouter = require('./routes/Note')
app.use("/", noteRouter);

app.listen(5000, function(){
    console.log("🚀 Server started at PORT:5000")
});