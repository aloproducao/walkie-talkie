var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    fs = require('fs'),
    nconf = require('nconf');

nconf.argv()
    .env()
    .file({
        file: 'config.json'
    });

app.use(express.static('public'));

io.on('connection', function(socket) {
    socket.join('walkie-talkie');

    socket.on('talk', function(msg) {
        socket.broadcast.to('walkie-talkie').emit('talk', msg);
    });
});

var port = process.env.PORT || nconf.get('server:port');
http.listen(port, function() {
    console.log('listening on *:', port);
});