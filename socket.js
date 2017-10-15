const ent = require('ent');
function init(app){
	var server = require('http').Server(app);
	var io = require('socket.io')(server);

	io.on('connection', function(socket) {

	    socket.on('disconnect', function() {
	        socket.broadcast.emit('parti_client', socket.pseudo);
	    });
		
		// TODO
	});
	return server
}

module.exports = init;