function Network() {
  // this.test = "x"
  var socket = io();
  var sceneData = main.scene.toJSON();

  this.publishObjects = function() {

    console.log(sceneData)
    socket.emit("data/scene-children", { data: sceneData })
  }
}