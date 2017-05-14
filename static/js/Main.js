function Main() {


  var scene, camera, renderer;

  scene = new THREE.Scene();

  camera = new THREE.OrthographicCamera(
    window.innerWidth / -2,
    window.innerWidth / 2,
    window.innerHeight / 2,
    window.innerHeight / -2,
    0, // minimalny zasięg musi być >= 0
    10000);

  // camera = new THREE.PerspectiveCamera(
  //         60, // kąt patrzenia kamery (FOV - field of view)
  //         window.innerWidth / window.innerHeight, // proporcje widoku, powinny odpowiadać proporjom naszego ekranu przeglądarki
  //         0.1, // minimalna renderowana odległość
  //         10000 // maxymalna renderowana odległość
  //     );

  camera.position.set(20, 50, -100)

  camera.rotation.x = -Math.PI / 2;
  camera.lookAt(scene.position);
  // console.log(scene.position)

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor(0x000000);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("main").appendChild(renderer.domElement);

  // renderer.shadowMapEnabled = true
  // renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // RAYCASTER
  function raycaster() {

    function findRaycasted(event) {
      var raycaster = new THREE.Raycaster(); // obiekt symulujący "rzucanie" promieni
      var mouseVector = new THREE.Vector2() // wektor (x,y) wykorzystany będzie do określenie pozycji myszy na ekranie
        // pozycja myszy zostaje przeliczona na wartości 0- 1, wymagane przez raycaster

      mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // szukamy punktów wspólnych "promienia" i obiektu 3D 

      raycaster.setFromCamera(mouseVector, level.camera);

      // intersects - tablica obiektów w które "trafia" nasz "promień" wysyłany z kamery
      // scene.children oznacza, że szukamy meshów bezpośrednio dodanych do sceny3D

      var intersects = raycaster.intersectObjects(scene.children);

      // console.log(intersects.length)
      // jeśli długość tablicy > 0 oznacza to że "trafiliśmy" w obiekt 3D czyli "kliknęliśmy" go

      if (intersects.length > 0) {
        // zerowy w tablicy czyli najbliższy kamery obiekt to ten, którego potrzebujemy:
        console.log(intersects[0].object.name);
      }
    }

    document.addEventListener("mousedown", findRaycasted, false);

  }


  // LINIE POMOCNICZE
  var axis = new THREE.AxisHelper(2000); // 200 - wielkość
  //   scene.add(axis);

  function initObjects() {
    material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      side: THREE.DoubleSide
    });

    geometry = new THREE.PlaneBufferGeometry(50, 50, 8, 8);

    var mesh = new THREE.Mesh(geometry, material)

    scene.add(mesh)

    // console.log(scene.children)
  }

  // game.moveCamera();


  (function animateScene() {

    // TODO Repair camera
    if (game) {
      // console.log(game)
      if (game.arrow.up) {
        camera.position.y += 5;
        camera.lookAt(new THREE.Vector3(375, 0, 375))

      } else if (game.arrow.down) {
        camera.position.y -= 5;
        camera.lookAt(new THREE.Vector3(375, 0, 375))

      }
      // TODO set center of camera rotation ?? Now it rotates over 0
      if (game.arrow.left) {
        // camera.position.x += 5;
        game.arrow.angle += 2;
        camera.position.x = Math.cos(Math.PI / 180 * game.arrow.angle) * 2048
        camera.position.z = Math.sin(Math.PI / 180 * game.arrow.angle) * 2048
        camera.lookAt(new THREE.Vector3(375, 0, 375))

      } else if (game.arrow.right) {
        game.arrow.angle -= 2;
        camera.position.x = Math.cos(Math.PI / 180 * game.arrow.angle) * 2048
        camera.position.z = Math.sin(Math.PI / 180 * game.arrow.angle) * 2048
        camera.lookAt(new THREE.Vector3(375, 0, 375))
          // console.log(game.arrow.angle)
      }
    }


    renderer.render(scene, camera);
    //mesh.scale.set(1, 1, 1);

    camera.updateProjectionMatrix();
    requestAnimationFrame(animateScene);


  }())

  this.scene = scene;
}