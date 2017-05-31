// TODO: Clean up this fucking mess in Game.js legacy functions
function Network() {
  // this.test = "x"
  var socket = io();

  this.saveBuildings = function () {

    let project = {
      buildings: [],
      date: (new Date()).toLocaleDateString() + " " + (new Date()).toLocaleTimeString()
    }

    let buildings = main.scene.children.filter(e => {
      return e.name.split("_")[0] == "block"
    })


    for (let value of buildings) {
      let data = {
        name: value.name,
        rotation: value.userData.rotation,
        color: value.userData.color,
        children: []
      }

      for (let child of value.children) {
        data.children.push(child.name)

      }
      project.buildings.push(data)
    }


    console.log(project)


    socket.emit("project/save", project)

  }
  socket.on("project/save", data => {
    // game.addLegacyBlock(data)
    console.log(data)
    UI.showInfo(data.text)
  })

  socket.on("user/projects", data => {
    // game.addLegacyBlock(data)
    console.log("Saved projects:", data)
    UI.showProjects(data)
  })

  // Admin-only feature
  socket.on("user/users", data => {
    // game.addLegacyBlock(data)
    // console.log("Users:", data)
    UI.showUsers(data);
  })

  // TODO: Here start adding to local var, then when save buildings called send them to server
  this.addBlock = function (block) {
    var blockInfo = {
      rot: block.rotation,
      x: block.position.x,
      y: block.position.y,
      z: block.position.z,
      // temporarily
      color: block.children[0].material.color,
      num: 1
    }
    game.buildings.push(blockInfo)
    // console.log(game.buildings)
    // console.log(main.scene.children)
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
  this.changeBlockSize = function (direction) {
    socket.emit("block/change-size", direction)
  }
  socket.on("block/change-size", data => {
    game.changeLegacyBlockSize(data)
  })

  // ------- color
  this.changeBlockColor = function (color) {
    socket.emit("block/change-color", color)
  }
  socket.on("block/change-color", data => {
    game.changeLegacyBlockColor(data)
  })

  // ------- rotation
  this.changeBlockRotation = function (rotation) {
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


  this.register = function (data) {
    socket.emit("user/register", data)
  }
  socket.on("user/register", data => {
    UI.showInfo(data.text)
    console.log(data)
  })

  this.login = function (data) {
    socket.emit("user/login", data)
  }

  this.logOut = function () {
    socket.emit("user/logout", {})
  }

  socket.on("user/logout", data => {
    UI.showInfo(data.text)
    console.log(data)
    if (data.success == true) {
      UI.nodes.loginContainer.classList.remove("hidden")
      UI.nodes.loginContainer.classList.add("visible")
      UI.nodes.userInfoContainer.classList.remove("visible")
      UI.nodes.userInfoContainer.classList.add("hidden")
      UI.nodes.buildingsContainer.classList.remove("visible")
      UI.nodes.buildingsContainer.classList.add("hidden")
      game.buildingAllowed = false;
    }
  })

  // for development
  // this.login({name: "admin", password: "admin"})

  socket.on("user/login", data => {
    UI.showInfo(data.text)
    console.log(data)
    if (data.success == true) {
      game.clearScene();
      UI.nodes.loggedAs.innerHTML = data.name;
      game.buildingAllowed = true;
      UI.nodes.loginContainer.classList.remove("visible")
      UI.nodes.loginContainer.classList.add("hidden")
      UI.nodes.userInfoContainer.classList.remove("hidden")
      UI.nodes.userInfoContainer.classList.add("visible")
      UI.nodes.buildingsContainer.classList.remove("hidden")
      UI.nodes.buildingsContainer.classList.add("visible")

    }
  })
}
