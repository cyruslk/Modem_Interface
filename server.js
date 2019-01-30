var express = require('express');
var socket = require('socket.io');
const { spawn } = require('child_process');
const loudness = require('loudness')


var app = express();

server = app.listen(5000, function(){
    console.log('server is running on port 5000')
});



io = socket(server);

io.on('connection', (socket) => {
    socket.on('SEND_COORDINATES', function(data, callback){
      loudness.setVolume(100, (err) => {
          console.log(err);
        })
      const dataToString = `[${data.x.toString()}, ${data.y.toString()}]`;
      process.stdout.write(dataToString);
    })
    socket.on('STOP_SOUND', function(data, callback){
      loudness.setVolume(0, (err) => {
        console.log(err);
      })
    })
});
