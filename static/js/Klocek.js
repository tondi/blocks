function Klocek() {

  var particles = [];

  //puste zmienne: materiał , geometria, światło, mesh
  var material, geometry, light, mesh;

  // kontener
  var container = new THREE.Object3D();

  // init
  function init() {

    material = new THREE.MeshBasicMaterial({
      color: 0xff6600,
      // there was more
      //   depthWrite: false
      //   blending: THREE.AdditiveBlending // kluczowy element zapewniający mieszanie kolorów poszczególnych cząsteczek
    });
    // for (let i = 0; i < 200; i++) {
    //   // console.log(rand(1,5))
    //   var rand15 = rand(1, 5)
    var geometry = new THREE.BoxGeometry(50, 30, 50);

    var cube = new THREE.Mesh(geometry, material)
    cube.position.set(0, 15, 0)

    //   //new THREE.Mesh(geometry, material.clone())
    //   particles[i] = new THREE.Sprite(material.clone());
    //   particles[i].scale.set(2, 2.1)
    //   particles[i].position.set(rand15 * 1, 0, rand15 * 1)
    //     // level.scene.add(particles[i])
    //     // console.log(particles[0].material)
    //   container.add(particles[i]);
    // }

    // light = new THREE.PointLight(0xff6600, 1, 500, 2);

    var cylinderGeometry = new THREE.CylinderGeometry(7.5, 7.5, 5, 32);
    var cylinderMaterial = new THREE.MeshBasicMaterial({
      color: 0x2233aa,
    });

    var cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial)

    var cylinderClone0 = cylinder.clone();
    cylinderClone0.position.set(-12.5, 32.5, -12.5)
    container.add(cylinderClone0)

    var cylinderClone1 = cylinder.clone();
    cylinderClone1.position.set(12.5, 32.5, -12.5)
    container.add(cylinderClone1)

    var cylinderClone2 = cylinder.clone();
    cylinderClone2.position.set(12.5, 32.5, 12.5)
    container.add(cylinderClone2)

    var cylinderClone3 = cylinder.clone();
    cylinderClone3.position.set(-12.5, 32.5, 12.5)
    container.add(cylinderClone3)


    var singleGeometry = new THREE.Geometry();

    meshA.updateMatrix(); // bez tego pozycja geometrii jest zawsze 0,0,0
    singleGeometry.merge(meshA.geometry, meshA.matrix);

    meshB.updateMatrix();
    singleGeometry.merge(meshB.geometry, meshB.matrix);

    var singleMesh = new THREE.Mesh(singleGeometry, anyMaterial);


    // Just a HELPER
    var edges = new THREE.EdgesHelper(cube, 0x0000ff);
    edges.material.linewidth = 2;
    edges.position.set(0, 15, 0)
    container.add(edges);

    container.add(cube)
      // container.add(cylinder)

  }

  init();

  // funkcja publiczna zwracająca obiekt kontenera
  // czyli nasze światło wraz z bryłą

  this.getKlocek = function() {
    return container;
  }

  // inne funkcje publiczne, np zmiana koloru bryły, zmiana koloru światła

  // this.updateFire = function () {
  //     for (let value of particles) {
  //     // console.log(value)


  //         value.position.x -= rand(-0.8, 0.8);
  //         value.position.y += rand(0, 1);
  //         value.position.z -= rand(-0.8, 0.8);

  //         value.material.opacity -= 0.020;

  //         // console.log(value.material)

  //         if (value.position.y > 25) {
  //             var rand15 = rand(1, 5)

  //             value.position.set(rand15 * 2, 0, rand15 * 2)
  //             value.material.opacity = 1;
  //         }
  //         /*

  //         - kiedy osiągnie odpowiednią pozycje np 20, ustaw go na y = 0 lub w losowej pozycji  0 - 5

  //         - wylosuj też x i z w celu poszerzenia zasięgu ogniska

  //         - zmniejszaj opacity o 0.01 

  //         - losuj każdej cząsteczce szybkość poruszania się w górę

  //         - kiedy pozycja cząsteczki jest większa od 20 zeruj ją i ustawiaj opacity na = 1

  //         */


  //     }
  // }

}