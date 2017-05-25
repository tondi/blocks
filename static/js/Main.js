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

  camera.position.set(-300, 250, -300)

  camera.rotation.x = -Math.PI / 2;
  camera.lookAt(new THREE.Vector3(350, 0, 350));
  // console.log(scene.position)

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor(0x000000);
  renderer.setPixelRatio(window.devicePixelRatio);
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

    // console.log(intersects[0].object)

    // jeśli długość tablicy > 0 oznacza to że "trafiliśmy" w obiekt 3D czyli "kliknęliśmy" go

    if (intersects.length > 0) {

      // zerowy w tablicy czyli najbliższy kamery obiekt to ten, którego potrzebujemy:
      // console.log(intersects);

      // changed to parent
      var mesh = intersects[0].object.parent;
      var name = intersects[0].object.parent.name;
      console.log("kliknieto", mesh)

      var arr = name.split("_")
      var obj = arr[0];
      // console.log(obj);
      var x = Number(arr[1]);
      var z = Number(arr[2]);
      var y = Number(arr[3]);
      if (obj == "plane") {
        game.addBlock(x, 0, z)
      }
      // DONE
      if (obj == "block") {
        // console.log(mesh)
        game.addBlock(x, mesh.userData.countAddedY + 1, z)
        mesh.userData.countAddedY++;
        // console.log(intersects[0].object.parent.userData.countAddedY)
      }
      if (obj == "subBlock") {
        // console.log(mesh)
        // console.log(mesh.parent.name)
        console.log(Number(mesh.parent.name.split("_")[1]) + x, mesh.userData.countAddedY + y, Number(mesh.parent.name.split("_")[2]) + z)
          // TODO
        game.addBlock(Number(mesh.parent.name.split("_")[1]) + x, mesh.userData.countAddedY + y, Number(mesh.parent.name.split("_")[2]) + z)
          // console.log("mesh userdata count y", mesh.userData.countAddedY, "y", y)
        mesh.userData.countAddedY++;
        // console.log(intersects[0].object.parent.userData.countAddedY)
      }

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
  var initialCameraPos = true;

  (function animateScene() {


    if (initialCameraPos) {

      camera.position.x = Math.cos(Math.PI / 180 * keyboard.arrow.angle) * 1000 + 350
      camera.position.z = Math.sin(Math.PI / 180 * keyboard.arrow.angle) * 1000 + 350
      camera.lookAt(new THREE.Vector3(350, 0, 350))

      initialCameraPos = false;

    }
    if (keyboard.arrow.up) {
      camera.position.y += 20;
      camera.lookAt(game.center)

    } else if (keyboard.arrow.down) {
      camera.position.y -= 15;
      camera.lookAt(game.center)

    }
    // TODO set center of camera rotation ?? Now it rotates over 0
    if (keyboard.arrow.left) {
      // camera.position.x += 5;
      keyboard.arrow.angle += 4;
      // 350 is the center of a board both in x and z
      camera.position.x = Math.cos(Math.PI / 180 * keyboard.arrow.angle) * 1000 + 350
      camera.position.z = Math.sin(Math.PI / 180 * keyboard.arrow.angle) * 1000 + 350
      camera.lookAt(game.center)

    } else if (keyboard.arrow.right) {
      keyboard.arrow.angle -= 4;
      camera.position.x = Math.cos(Math.PI / 180 * keyboard.arrow.angle) * 1000 + 350
      camera.position.z = Math.sin(Math.PI / 180 * keyboard.arrow.angle) * 1000 + 350
      camera.lookAt(game.center)
        // console.log(game.arrow.angle)
    }


    renderer.render(scene, camera);
    //mesh.scale.set(1, 1, 1);

    camera.updateProjectionMatrix();

    // Working with surface pro 2 now
    setTimeout(() => {
      requestAnimationFrame(animateScene);
    }, 1000 / 10)


  }())

  this.scene = scene;
  this.renderer = renderer;
  this.camera = camera;
}