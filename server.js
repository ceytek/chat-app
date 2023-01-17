const path = require("path");
const http = require('http');
const socket = require('socket.io');
const express = require('express');

require('dotenv').config()
const PORT = 300 || process.env.PORT;  



const app = express();
const server = http.createServer(app);
server.listen(PORT , () => console.log(`Server is running on port ${PORT}`));
app.use(express.static(path.join(__dirname, "public")));

const Redis = require('ioredis');
const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
})

const io = socket(server);

