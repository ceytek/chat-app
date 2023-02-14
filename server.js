const path = require("path");
const http = require('http');
const socketio = require('socket.io');
const express = require('express');
const formatMessage = require('./utils/messages');
const {userJoin, getCurrentUser} = require('./utils/users');

require('dotenv').config()
const PORT = 3001 || process.env.PORT;  

const app = express();
const server = http.createServer(app);


app.use(express.static(path.join(__dirname, "public")));
const bot = 'ceytek';

const Redis = require('ioredis');
const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
})


const io = socketio(server);

//Run when client connect
io.on('connect', socket =>{
    socket.on('joinRoom', ({username, room})=>{
    const user =userJoin(socket.id, username, room)
    socket.join(user.room)
       
    socket.emit('message', formatMessage(bot ,'Hoş geldiniz.'));
   
    socket.broadcast
     .to(user.room)
     .emit('message',
     formatMessage(bot ,`${user.username} giriş yaptı.`)
    );
    
    socket.on('chatMessage',msg =>{
        const user = getCurrentUser(socket.id)
        io.to(user.room).emit('message',formatMessage(user.username , msg));
      });
    socket.on('disconnect', () =>{
        io.emit('message', formatMessage(bot ,`${user.username} sohbetten ayrıldı.`));
    });

    })


});



server.listen(PORT , () => console.log(`Server is running on port ${PORT}`));