const express = require('express');
const socketIO = require('socket.io');
const app = express();

const http = require('http');
const server = http.createServer(app);

const io = socketIO(server);
app.set('port', process.env.PORT || 3008);

io.on('connection',function(socket){
    console.log(socket.id);

    socket.on('newMessage',function(message,callback){
        console.log(message);
        socket.broadcast.emit('reciveMessage', message);
        callback(message);
    });
});

server.listen(app.get('port'),function(){
    console.log("Port Listening at " + app.get('port'))
});