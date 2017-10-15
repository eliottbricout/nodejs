const ent = require('ent');
function init(app){
	var server = require('http').Server(app);
	var io = require('socket.io')(server);

	io.on('connection', function(socket) {

		socket.on('message', function (message) {
	        message = ent.encode(message);
	        socket.broadcast.emit('message', {pseudo: socket.pseudo, message: message});
	    }); 

	    socket.on('nouveau_client', function(pseudo) {
	        pseudo = ent.encode(pseudo);
	        socket.pseudo = pseudo;
	        socket.broadcast.emit('nouveau_client', pseudo);
	    });

	    socket.on('disconnect', function() {
	        socket.broadcast.emit('parti_client', socket.pseudo);
	    });
	});
	return server
}

module.exports = init;