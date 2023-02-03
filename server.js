const path = require("path");
const http = require('http');
const socketio = require('socket.io');
const express = require('express');

require('dotenv').config()
const PORT = 3000 || process.env.PORT;  

const app = express();
const server = http.createServer(app);


app.use(express.static(path.join(__dirname, "public")));

const Redis = require('ioredis');
const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
})


const io = socketio(server);

//Run when client connect
io.on('connect', socket =>{
    console.log("New User came");


    socket.emit("message", "Welcome to Chat")
});

io.on('disconnect', socket =>{
    console.log("Disconnect")
})


server.listen(PORT , () => console.log(`Server is running on port ${PORT}`));