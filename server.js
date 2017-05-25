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
// Temporarily has user previgles (is part of User shema)
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
  // console.log("CURRENT ID connection: ", socket.id)

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
    console.log("obecnie zalogowani uzytwkonicy: ", loggedUsers)

    // console.log("loggedusers", loggedUsers)
    // TODO Figure if below can be written easier with that if below
    var userAlreadyLogged = false;
    for (let value of loggedUsers) {
      if (value.name == userData.name) {
        userAlreadyLogged = true;
      }
    }
    console.log("user is already logged:", userAlreadyLogged)
    if (!userAlreadyLogged /*!loggedUsers.includes(userData.name)*/ ) {
      opers.ValidateUser(Models.User, userData.name, userData.password).then(data => {
        console.log(data)

        // Set the user that builds
        currentUser = userData.name;
        let loggedUser = {
          name: userData.name,
          id: socket.id
        }
        loggedUsers.push(loggedUser)

        // Send login inf
        io.sockets.to(socket.id).emit("user/login", data);

        console.log("obecnie zalogowani uzytwkonicy: ", loggedUsers)

        if (loggedUser.name == "admin") {
          console.log("admin logs")
          let any = new RegExp(".");
          opers.SelectUserProjects(Models.Project, any).then((response) => {
            // FOR DEV
            // console.log("ADMIN: udalo sie znalzezc wszystkie projekty:", response)
            // io.sockets.to(socket.id).emit("user/projects", response.data);

            // // TODO remove this hack for displating users as admin 
            // let users = []
            // for (let value of response.data) {
            //   if (users.indexOf(value.login) == -1) {
            //     users.push(value.login)
            //   }
            // }

            // var obj = {};

            // for (let i = 0; i < users.length; i++) {
            //   for (let j = 0; j < response.data.length; j++) {
            //     if (users[i] == response.data[j]) {
            //       obj[users[i]] = "response.data[j]";
            //     }
            //   }
            // }
            // // tu wysylam obj z przyporzadkowaniem peojektow userom
            // io.sockets.to(socket.id).emit("user/projects", users);
          }).catch(response => {
            console.log("ADMIN: Nie udalo sie znalezc projektow", response)
            io.sockets.to(socket.id).emit("user/projects", response);

          })
        } else {
          // send users buildings
          opers.SelectUserProjects(Models.Project, currentUser).then((response) => {
            console.log("udalo sie znalzezc projekty. RESPONSE:", response)
            io.sockets.to(socket.id).emit("user/projects", response.data);

          }).catch(response => {
            console.log("Nie udalo sie znalezc projektow", response)
            io.sockets.to(socket.id).emit("user/projects", response);

          })

        }
      }).catch(data => {
        console.log(data)
        io.sockets.to(socket.id).emit("user/login", data);
      })

    } else {
      let data = {
        success: false,
        text: "User is already logged"
      }
      io.sockets.to(socket.id).emit("user/login", data);
    }

  })

  socket.on("user/logout", data => {
    console.log("logout id: ", socket.id)
    console.log("logged users: ", loggedUsers);


    let index;
    for (let i in loggedUsers) {
      if (loggedUsers[i].id == socket.id) {
        index = i;
      }
    }
    console.log("loggedUsers: ", loggedUsers, "index: ", index)
    if (index !== -1) {
      console.log("Usuwam usera o pozycji w loggedUsers", index)
      loggedUsers.splice(index, 1)
      let data = {
        success: true,
        text: "Sucecssfully logged out"
      }
      io.sockets.to(socket.id).emit("user/logout", data);
    }
    console.log("obecnie zalogowani uzytwkonicy: ", loggedUsers)
      // socket.broadcast.emit("block/add", data)
  })


  // BUILDINGs
  // socket.on("block/add", data => {
  //   console.log(data)
  //   socket.broadcast.emit("block/add", data)
  // })
  // socket.on("block/change-color", data => {
  //   console.log(data)
  //   socket.broadcast.emit("block/change-color", data)
  // })

  // socket.on("block/change-size", data => {
  //   console.log(data)
  //     // io.sockets.emit("block/change-size", data)
  //   socket.broadcast.emit("block/change-size", data)
  // })

  // socket.on("block/change-rotation", data => {
  //   console.log(data)
  //   socket.broadcast.emit("block/change-rotation", data)
  // })

  // save suer Project
  socket.on("project/save", data => {
    console.log("save : ", data)
    console.log("user : ", currentUser)
      // save in db

    let project = new Models.Project({
      login: currentUser,
      date: data.date,

    });

    // Nice! <3 MongoDB
    for (let i in data.buildings) {
      project.buildings.push(data.buildings[i])
      for (let inner of data.buildings[i].children) {
        project.buildings[i].children.push(inner)
      }
    }

    project.validate(function(err) {
      console.log("err:", err);
    });

    opers.SaveProject(project).then((response) => {
      console.log("after saving success:", response)
      io.sockets.to(socket.id).emit("project/save", response);

    }).catch((response) => {
      console.log("after saving fail:", response)
      io.sockets.to(socket.id).emit("project/save", response);

    })

    // comment this or not?
    // socket.broadcast.emit("project/save", data)
  })


  socket.on("disconnect", function() {
    console.log("klient się rozłącza")

    console.log("CURRENT ID: ", socket.id)

    // Removing disconnecting user from loggedUsers []
    let disconnectedUser;
    for (let value of loggedUsers) {
      if (value.id == socket.id) {
        console.log("rozlaczyl sie user", value.name)
        disconnectedUser = value.name;
      }
    }
    let index;
    // let index = loggedUsers.indexOf(disconnectedUser);
    for (let i in loggedUsers) {
      if (loggedUsers[i].name == disconnectedUser) {
        index = i;
      }
    }
    console.log("loggedUsers: ", loggedUsers, "index: ", index)
    if (index !== -1) {
      console.log("Usuwam usera o pozycji w loggedUsers", index)
      loggedUsers.splice(index, 1)

    }
    console.log("obecnie zalogowani uzytwkonicy: ", loggedUsers)
  })
});

app.use(express.static('static'))