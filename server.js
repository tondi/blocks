var express = require('express')
var app = express()
var http = require('http').Server(app);

// app.listen(3000, function() {
//   console.log('Example app listening on port 3000!')
// })

var server = app.listen(3000)
var io = require('socket.io').listen(server);

io.on('connection', function(socket) {
  console.log('a user connected');

  socket.on("disconnect", function() {
    console.log("klient się rozłącza")
  })
});

app.use(express.static('static'))