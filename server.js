const express = require('express');
const socket = require('socket.io');
const path = require("path");

require('dotenv').config()
const port = process.env.PORT;  

const app = express();
const server = app.listen(port || 3000);
app.use(express.static(path.join(__dirname, "public")));

const Redis = require('ioredis');
const redis = new Redis({
    host: process.env.REDIS_HOST,
    por: process.env.REDIS_PORT
})

const io = socket(server);

io.on('connection', (socket)=>{
    console.log(socket.id)

    socket.on('chat', data =>{
        io.sockets.emit('chat', data); 
    })

    socket.on('typing', data => {
        socket.broadcast.emit('typing', data)
    })
});