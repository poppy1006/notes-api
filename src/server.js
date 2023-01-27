const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Note = require('./models/Note');
mongoose.set('strictQuery', true);

mongoose.connect("mongodb+srv://poppy:poppy@cluster0.egrx7q7.mongodb.net/notesdb") .then(function(){
    console.log("db connected")
    
});

// routes
app.get("/" ,function(req,res){
    res.send("index");
});

app.get("/notelist" ,async function(req,res){
    var notes = await Note.find();
    res.json(notes);
    // res.send("notes");
});

app.get("/notelist/:userid" ,async function(req,res){
    var notes = await Note.find({userid: req.params.userid});
    res.json(notes);
    // res.send("notes");
});

app.get("/noteadd" ,async function(req,res){

    const newNote = new Note({
        id: "0007",
        userid: "poppy2@gmail.com",
        title: "test note2",
        content: "asdfghjk wedfghy wertgyh wsedrfgtyhuj swedrfgty edrfgt "
    });
    await newNote.save();
   const response = {message:"New note created!"}
    res.json(response);
    // res.send("notes");
});

app.listen(5000, function(){
    console.log("🚀 Server started at PORT:5000")
});