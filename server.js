const express=require('express')
const app=express();
const {v4: uuidv4} = require("uuid")

app.set('view engine', 'hbs')

app.get("/", (req, res) => {
    res.render("Login");
})
app.post("/login", (req, res) => {
    //check then redirect to main page
    res.render("room");
})

app.post("/signUp", (req, res) => {
    //check then redirect
    res.render("room")
})

app.post("/room", (req, res) => {
    res.render('room', {roomId: req.params.room})
})

app.post("/meeting", (req, res) => {
    res.render("meeting")
})







app.listen(3000, () =>{
    console.log("listening on 3000")
});