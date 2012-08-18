var io = require('socket.io');
var express = require('express');
var app = express()
  , _ = require('underscore')._
  , server = require('http').createServer(app)
  , io = io.listen(server)
  , readyQueue = require('./queue')
  , events = require('events');

var ee = new events.EventEmitter;
var roomno=1;
var playersCount = 0;
var gamesStarted = 0;
server.listen(81);

ee.on('match', function() {
  console.log('matching players');
  matchPlayers();
});


function matchPlayers() {
  var players = readyQueue.dequeue();
  if(_.isEmpty(players)) return;
  var pos = 1;
  _.each(players, function(socket) {
    //console.log(socket.get('nickname'));
    socket.join(roomno);
    socket.emit('ready',{pos:pos++,id:roomno});
  });

  console.log('players matched', roomno);
  roomno++;
  gamesStarted++;
}

io.sockets.on('connection', function (socket) {

  socket.on('register', function(data) {
    //socket.set('nickname', data.nick);
    readyQueue.enqueue(data.id,socket);
    ee.emit('match');
    playersCount++;
    //socket.emit('stats',{players:playersCount,games:gamesStarted});
    //socket.broadcast.emit('stats',{players:playersCount,games:gamesStarted});
    io.sockets.emit('stats',{players:playersCount,games:gamesStarted});
  });

  socket.on('message', function (data) {
    console.log(data);
    socket.broadcast.to(data.id).emit('message', data.msg);
  });

  socket.on('move', function (data) {
    socket.broadcast.to(data.id).emit('move', data.pos);
  });

  socket.on('disconnect', function (data) {
    playersCount--;
    io.sockets.emit('stats',{players:playersCount,games:gamesStarted});
  });
});
