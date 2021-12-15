// Cargamos módulos Node
var express = require('express');
var http = require('http');
var path = require('path');
// Creamos aplicación, servidor y sockets
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/public'));

// Configuramos la aplicación, ver http://expressjs.com/api.html
//app.configure(function() {
    //app.set('views', __dirname + '/views');
    //app.set('view engine', 'html');
    //app.use(express.static(__dirname + '/public'));
//});

// Routing
app.get('/', function(req, res) {
   res.json({hola:"test"});
});

io.sockets.on('connection', function (socket){
	socket.on('micoord', function (data){
		console.log(data);
		socket.broadcast.emit('coords:user', data);
	});
});

server.listen(3000);
console.log('Servidor node Js en http://localhost:3000');