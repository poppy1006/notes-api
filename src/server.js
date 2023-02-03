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
app.get("/" ,function(req,res){
    res.send("index");
});

app.get("/notelist" ,async function(req,res){
    // console.log("request recived");
    var notes = await Note.find();
    res.json(notes);
    // res.send("notes");
});

app.get("/notelist/:userid" ,async function(req,res){
    var notes = await Note.find({userid: req.params.userid});
    res.json(notes);
    // res.send("notes");
});

app.post("/noteadd" ,async function(req,res){

    // res.json(req.body);
    const newNote = new Note({
        id: req.body.id,
        userid: req.body.userid,
        title: req.body.title,
        content: req.body.content
    });
    await newNote.save();
    const response = { message:"New note created! "};
    res.json(response);
    // res.send("notes");
});

app.listen(5000, function(){
    console.log("🚀 Server started at PORT:5000")
});