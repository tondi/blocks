var express = require('express')
var app = express()
var http = require('http').Server(app);

// app.listen(3000, function() {
//   console.log('Example app listening on port 3000!')
// })

var server = app.listen(3000, () => {
    console.log('Port 3000!')
})
var io = require('socket.io').listen(server);

io.on('connection', function(socket) {
    console.log('a user connected');

    socket.on("block/add", data => {
        console.log(data)
        socket.broadcast.emit("block/add", data)
    })
    socket.on("block/change-color", data => {
        console.log(data)
        socket.broadcast.emit("block/change-color", data)
    })

    socket.on("block/change-size", data => {
        console.log(data)
            // io.sockets.emit("block/change-size", data)
        socket.broadcast.emit("block/change-size", data)
    })

    socket.on("block/change-rotation", data => {
        console.log(data)
        socket.broadcast.emit("block/change-rotation", data)
    })

    // socket.on("data/scene-children", function(data) {
    //     console.log("odbieranie data scene")
    //     console.log(data)
    // })

    socket.on("disconnect", function() {
        console.log("klient się rozłącza")
    })
});

app.use(express.static('static'))