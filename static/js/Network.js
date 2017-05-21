// {
//     "_id":"58ec9ffcf2218f23d8f38125"
//     "login":"bbb"
//     "building":[
//     {
//         "rot": 0,
//         "z": -250,
//         "y": 0,
//         "x": 50,
//         "color": 2,
//         "num": 1
//     },
//     {
//         "rot": 0,
//         "z": -250,
//         "y": 50,
//         "x": 50,
//         "color": 2,
//         "num": 1
//     }
//     ]

// }

// TODO: Clean up this fucking mess in Game.js legacy functions 
function Network() {
  // this.test = "x"
  var socket = io();

  // TODO: Here start adding to local var, then when save buildings called send them to server
  this.addBlock = function(block) {
      var blockInfo = {
        rot: block.rotation,
        x: block.position.x,
        y: block.position.y,
        z: block.position.z,
        // temporarily
        color: block.children[0].material.color,
        num: 1
      }

      // send to server
      socket.emit("block/add", blockInfo)
    }
    // socket.broadcast.to('game').emit('message', 'nice game');

  socket.on("block/add", data => {
    game.addLegacyBlock(data)
  })

  //   this.addBlock = function(block) {
  //       var blockInfo = {
  //         rot: block.rotation,
  //         x: block.position.x,
  //         y: block.position.y,
  //         z: block.position.z,
  //         // temporarily
  //         color: block.children[0].material.color,
  //         num: 1
  //       }

  //       // send to server
  //       socket.emit("block/add", blockInfo)

  //       // recieve from server
  //     }
  //     // socket.broadcast.to('game').emit('message', 'nice game');
  //   socket.on("block/add", data => {
  //     game.addLegacyBlock(data)
  //   })

  //   //  ------- rozmiar
  //   this.changeBlockSize = function(direction) {
  //     socket.emit("block/change-size", direction)
  //   }
  //   socket.on("block/change-size", data => {
  //     game.changeLegacyBlockSize(data)
  //   })

  //   // ------- color
  //   this.changeBlockColor = function(color) {
  //     socket.emit("block/change-color", color)
  //   }
  //   socket.on("block/change-color", data => {
  //     game.changeLegacyBlockColor(data)
  //   })

  //   // ------- rotation
  //   this.changeBlockRotation = function(rotation) {
  //     socket.emit("block/change-rotation", rotation)
  //   }
  //   socket.on("block/change-rotation", data => {
  //     game.changeLegacyBlockRotation(data)
  //   })


  //  ------- rozmiar
  this.changeBlockSize = function(direction) {
    socket.emit("block/change-size", direction)
  }
  socket.on("block/change-size", data => {
    game.changeLegacyBlockSize(data)
  })

  // ------- color
  this.changeBlockColor = function(color) {
    socket.emit("block/change-color", color)
  }
  socket.on("block/change-color", data => {
    game.changeLegacyBlockColor(data)
  })

  // ------- rotation
  this.changeBlockRotation = function(rotation) {
    socket.emit("block/change-rotation", rotation)
  }
  socket.on("block/change-rotation", data => {
    game.changeLegacyBlockRotation(data)
  })


  // var sceneData = main.scene.toJSON();

  // this.publishObjects = function() {

  //     console.log(sceneData)
  //     socket.emit("data/scene-children", { data: sceneData })
  // }


  this.register = function(data) {
    socket.emit("user/register", data)
  }
  socket.on("user/register", data => {
    UI.showInfo(data.text)

  })

  this.login = function(data) {
    socket.emit("user/login", data)
  }

  // for development
  this.login({ name: "admin", password: "admin" })

  socket.on("user/login", data => {
    UI.showInfo(data.text)
    if (data.succes == true) {
      console.log("succes logging! :)")
      game.buildingAllowed = true;
      UI.nodes.loginContainer.classList.remove("visible")
      UI.nodes.loginContainer.classList.add("hidden")

    }
  })
}