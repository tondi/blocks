function Light() {

  var light;

  // kontener
  var container = new THREE.Object3D();

  // init
  function init() {

    light = new THREE.DirectionalLight(0xb3b3b3, 2);

    container.add(light)

  }

  init();

  // funkcja publiczna zwracająca obiekt kontenera
  // czyli nasze światło wraz z bryłą

  this.getLight = function() {
    return container;
  }
}