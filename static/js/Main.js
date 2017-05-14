function Main() {


  var scene, camera, renderer;
  scene = new THREE.Scene();

  // camera = new THREE.OrthographicCamera(
  //   window.innerWidth / -2,
  //   window.innerWidth / 2,
  //   window.innerHeight / 2,
  //   window.innerHeight / -2,
  //   0, // minimalny zasięg musi być >= 0
  //   10000);

  camera = new THREE.PerspectiveCamera(
    60, // kąt patrzenia kamery (FOV - field of view)
    window.innerWidth / window.innerHeight, // proporcje widoku, powinny odpowiadać proporjom naszego ekranu przeglądarki
    0.1, // minimalna renderowana odległość
    10000 // maxymalna renderowana odległość
  );

  camera.position.set(-200, 150, -200)

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
  var findIntersections = function(event) {
    var raycaster = new THREE.Raycaster(); // obiekt symulujący "rzucanie" promieni
    var mouseVector = new THREE.Vector2() // wektor (x,y) wykorzystany będzie do określenie pozycji myszy na ekranie


    // pozycja myszy zostaje przeliczona na wartości 0- 1, wymagane przez raycaster

    mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;


    // szukamy punktów wspólnych "promienia" i obiektu 3D 

    raycaster.setFromCamera(mouseVector, camera);

    // intersects - tablica obiektów w które "trafia" nasz "promień" wysyłany z kamery
    // scene.children oznacza, że szukamy meshów bezpośrednio dodanych do sceny3D


    var intersects = raycaster.intersectObjects(scene.children);

    // kiedy chcemy kliknąć w obiekt, który ma elementy podrzędne, w raycasterze ustawiamy:
    var intersects = raycaster.intersectObjects(scene.children, true);

    console.log(intersects.length)

    // jeśli długość tablicy > 0 oznacza to że "trafiliśmy" w obiekt 3D czyli "kliknęliśmy" go

    if (intersects.length > 0) {

      // zerowy w tablicy czyli najbliższy kamery obiekt to ten, którego potrzebujemy:
      // console.log(intersects);

      // changed to parent
      var name = intersects[0].object.parent.name;
      console.log(name);

      var x = name.split("_")[1];
      var z = name.split("_")[2];
      console.log(x, z)
      game.addBlock(x * 50, 0, z * 50)

    }

    ///////////// OBSŁUGA PRZEMIESZCZANIA SWIATEŁ
  }
  document.addEventListener("mousedown", findIntersections, false);



  // LINIE POMOCNICZE
  var axis = new THREE.AxisHelper(2000); // 200 - wielkość
  scene.add(axis);

  // function initObjects() {
  //   material = new THREE.MeshBasicMaterial({
  //     color: 0xff0000,
  //     side: THREE.DoubleSide
  //   });

  //   geometry = new THREE.PlaneBufferGeometry(50, 50, 8, 8);

  //   var mesh = new THREE.Mesh(geometry, material)

  //   scene.add(mesh)

  //   // console.log(scene.children)
  // }

  // game.moveCamera();


  (function animateScene() {

    // TODO Repair camera
    if (game) {
      // console.log(game)
      if (game.arrow.up) {
        camera.position.y += 5;
        camera.lookAt(game.center)

      } else if (game.arrow.down) {
        camera.position.y -= 5;
        camera.lookAt(game.center)

      }
      // TODO set center of camera rotation ?? Now it rotates over 0
      if (game.arrow.left) {
        // camera.position.x += 5;
        game.arrow.angle += 2;
        // 350 is the center of a board both in x and z
        camera.position.x = Math.cos(Math.PI / 180 * game.arrow.angle) * 1000 + 350
        camera.position.z = Math.sin(Math.PI / 180 * game.arrow.angle) * 1000 + 350
        camera.lookAt(game.center)

      } else if (game.arrow.right) {
        game.arrow.angle -= 2;
        camera.position.x = Math.cos(Math.PI / 180 * game.arrow.angle) * 1000 + 350
        camera.position.z = Math.sin(Math.PI / 180 * game.arrow.angle) * 1000 + 350
        camera.lookAt(game.center)
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