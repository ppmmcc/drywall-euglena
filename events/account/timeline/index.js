'use strict';
var io = require('socket.io-client');
var ex_socket = new io.connect("http://171.65.102.132:3006");
var myClock;
var currenttime;

ex_socket.on('connect', function() {
	console.log(">>>> Connected!");
	currenttime = new Date();
	//callBlocks(currenttime);
});

ex_socket.on('disconnect', function() {
	console.log('>>> Clock lost');
});

ex_socket.on('postblocks', function(data){
  	socket.broadcast.to('/account/timeline/').emit('/timeline/#postBlocks', data);
});

exports.join = function(app, socket){
	console.log("////////////join//////////////");
  return function() {
    socket.visitor = 'guest';
    if (socket.handshake.user) {
      //socket.visitor = socket.handshake.user.username;
      socket.visitor = socket.handshake.user;
    }

    socket.join('timeline');
    socket.broadcast.to('timeline').send('helloooo');
    socket.broadcast.to('timeline').emit('/timeline/#newUser', socket.visitor);
  };
};

exports.callblocks = function(app, socket){
  return function(message) {
  	var beginT = message.begintime;
	var endT = message.endtime;
	console.log(beginT);
	console.log(endT);
	socket.visitor = socket.handshake.user;
	console.log(socket.visitor.id);
	//ex_socket.emit('timeline', { type: 'callblocks', userid: socket.visitor.id, begintime: beginT, endtime: endT});
  };
};

/*exports.reserve = function(app, socket){
  return function(message) {
    socket.broadcast.to('/account/timeline').emit('/timeline/#incoming', socket.visitor, message);
  };
};
*/


/*

// look clock
socket.emit('lookclock');

//call blocks
socket.emit('timeline', { type: 'callblocks', user:username, begintime: beginT, endtime: endT});

//reserve block
socket.emit('timeline', { type: 'reserveblock', user:user.username, begintime: beginT, endtime: endT});*/