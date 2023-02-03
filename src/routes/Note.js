const express = require('express');
const router = express.Router();
const Note = require('../models/Note');



router.get("/notelist" ,async function(req,res){
    // console.log("request recived");
    var notes = await Note.find();
    res.json(notes);
    // res.send("notes");
});

router.post("/notelist/:userid" ,async function(req,res){
    var notes = await Note.find({userid: req.params.userid});
    res.json(notes);
    // res.send("notes");
});

router.post("/noteadd" ,async function(req,res){

    await Note.deleteOne({ id: req.body.id });

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


router.post("/notedelete" ,async function(req,res){
    await Note.deleteOne({ id: req.body.id });
    const response = { message:"Note deleted!"};
    res.json(response);
});



module.exports = router;