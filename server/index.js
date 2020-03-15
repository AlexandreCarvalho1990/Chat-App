const express =require('express');
const socketio = require('socket.io');
const PORT = process.env.PORT || 5000;
const app = express();
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const io = socketio(server);
const router = require('./Router');
const {addUser, removeUser, getUser, getUsersInRoom} = require('./Users') ;

io.on('connection', (socket) => {
	socket.on('join', ({name, room}, callback) => {
		const {error, user} = addUser({id: socket.id, name, room});

		if(error) return callback(error);

		socket.emit('message', 
			{
			user: 'admin', text: `${user.name}, welcome to the room ${user.room}`, userId: user.id}
			);

		socket
		.broadcast
		.to(user.room)
		.emit('message', {user:'admin', text: `${user.name}, has joined!`});

		socket.join(user.room);

		callback();
	});

	socket.on('sendMessage',(message,callback)=> {
		const user = getUser(socket.id);
		io
		.to(user.room)
		.emit('message', {user: user.name, text: message});

		callback();
	});

	socket.on('disconnect', () =>{
		console.log('User is Offline!!');
	})
});
app.use(router);

server.listen(PORT, () => console.log(`Server has Started on Port: ${PORT}`));