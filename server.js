const express=require('express')
const app=express();
const {v4: uuidV4} = require("uuid")
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.set('view engine', 'ejs')
app.use(express.static('public'))
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
    res.render('room')
})

app.post("/meeting", (req, res) => {
    res.redirect(`${uuidV4()}`)
})

app.get('/:joinMeet', (req, res) => {
    res.render("joinMeet", {roomId: req.params.joinMeet})
})


io.on('connection', socket => {
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId)
        socket.to(roomId).broadcast.emit("user-connected", userId)

        socket.on('disconnect', () =>{
            socket.to(roomId).broadcast.emit('user-disconnected', userId)
        })
    })
})





server.listen(process.env.PORT || 3000)
