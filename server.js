var express = require('express')
var app = express()
var http = require('http').Server(app);
var mongoose = require("mongoose");
var server = app.listen(3000, () => {
  console.log('Port 3000!')
})
var io = require('socket.io').listen(server);

var Models = require("./database/Models.js")(mongoose)

mongoose.connect('mongodb://localhost/testKlasaGrupa')

var Operations = require("./database/Operations.js")
var db;

var opers = new Operations();

var currentUser;
var loggedUsers = [];

function connectToMongo() {

  db = mongoose.connection;

  //przy wystąpieniu błędu

  db.on("error", function() {
    console.log("problem z mongo")
  });

  //przy poprawnym połączeniu z bazą

  db.once("open", function() {
    console.log("mongo jest podłączone - można wykonywać operacje na bazie");
  });

  //przy rozłączeniu z bazą

  db.once("close", function() {
    console.log("mongodb zostało odłączone");
  });
}

connectToMongo();

// delet old users on start 
opers.DeleteAll(Models.User)

// Create admin on start
function createAdmin() {

  var admin = new Models.User({
    name: "admin",
    password: "admin"
  });

  opers.AddUser(Models.User, admin, function(text) {
    // Then we send it back to client
    //   io.sockets.to(socket.id).emit("user/register", {
    //     status: text
    //   });)
  })
}
createAdmin();

io.on('connection', function(socket) {
  console.log('a user connected');

  // REGISTER
  socket.on("user/register", data => {
    console.log("register data: ", data)

    // console.log("emit to " + socket.id)

    var user = new Models.User({
      name: data.name,
      password: data.password
    });

    user.validate(function(err) {
      console.log("err:", err);
    });

    opers.AddUser(Models.User, user, function(data) {
      // Then we send it back to client
      io.sockets.to(socket.id).emit("user/register", data);
    });
  })

  // LOGGING
  socket.on("user/login", userData => {
    console.log("login data: ", userData)

    // console.log(loggedUsers)
    if (!loggedUsers.includes(userData.name)) {
      opers.ValidateUser(Models.User, userData.name, userData.password).then(data => {
        console.log(data)
        io.sockets.to(socket.id).emit("user/login", data);

        // Set the user that builds
        currentUser = userData.name;
        loggedUsers.push(userData.name)
      }).catch(data => {
        console.log(data)
        io.sockets.to(socket.id).emit("user/login", data);
      })

    } else {
      let data = {
        succes: false,
        text: "User is already logged"
      }
      io.sockets.to(socket.id).emit("user/login", data);
    }

  })


  // BUILDING
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

  socket.on("disconnect", function() {
    console.log("klient się rozłącza")
  })
});

app.use(express.static('static'))