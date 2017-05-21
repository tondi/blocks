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

  // Temporarily during dev disabled

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

  socket.on("user/login", data => {
    console.log("login data: ", data)

    // console.log("emit to " + socket.id)
    // var user = new Models.User({
    //   name: data.name,
    //   password: data.password

    // });

    // user.validate(function(err) {
    //   console.log("err:", err);
    // });

    // AddUser returns callback with communicate
    // opers.AddUser(user, function(text) {
    //   // Then we send it back to client
    //   io.sockets.to(socket.id).emit("user/register", {
    //     status: text
    //   });
    // });


    // SelectByImie: function(Model, imie, count, callback) {
    //   Model.find({ name: imie }, function(err, data) {
    //     if (err) return console.error(err);
    //     // console.log(data);
    //     callback(data);
    //   }).limit(count)
    // },

    opers.ValidateUser(Models.User, data.name, data.password).then(data => {
      console.log(data)
      io.sockets.to(socket.id).emit("user/login", data);
    }).catch(data => {
      console.log(data)
      io.sockets.to(socket.id).emit("user/login", data);
    })
  })

  socket.on("disconnect", function() {
    console.log("klient się rozłącza")
  })
});

app.use(express.static('static'))