function ElementSiatki() {

  var particles = [];

  //puste zmienne: materiał , geometria, światło, mesh
  var material, geometry, light, mesh;

  // kontener
  var container = new THREE.Object3D();

  // init
  function init() {


    var lineMaterial = new THREE.LineBasicMaterial({ color: 0x777777 });
    var geometry = new THREE.Geometry();

    geometry.vertices.push(new THREE.Vector3(0, 0, 0));
    geometry.vertices.push(new THREE.Vector3(50, 0, 0));
    geometry.vertices.push(new THREE.Vector3(50, 0, 50));
    geometry.vertices.push(new THREE.Vector3(0, 0, 50));
    geometry.vertices.push(new THREE.Vector3(0, 0, 0));


    var line = new THREE.Line(geometry, lineMaterial);

    const planeGeometry = new THREE.PlaneGeometry(50, 50);
    const planeMaterial = new THREE.MeshBasicMaterial({ color: "#015547", side: THREE.DoubleSide });
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);


    planeMesh.rotateX(-Math.PI / 2)
      // reverse because we set position. cant be 0
    for (let x = 0; x < 15; x++) {
      for (let z = 0; z < 15; z++) {
        // console.log(i)
        let planeClone = planeMesh.clone()
        let lineClone = line.clone();


        container.add(planeClone)
        container.add(lineClone)
        lineClone.position.set(x * 50 - 25, 0, z * 50 - 25)
        planeClone.position.set(x * 50, 0, z * 50)

      }
    }
    // material = new THREE.MeshBasicMaterial({
    //     color: 0xff6600,
    //     transparent: true,
    //     opacity: 0.5,
    //     depthWrite: false,
    //     blending: THREE.AdditiveBlending // kluczowy element zapewniający mieszanie kolorów poszczególnych cząsteczek
    // });




    // for (let i = 0; i < 200; i++) {
    //   // console.log(rand(1,5))
    //   var rand15 = rand(1, 5)
    //     // var geometry = new THREE.BoxGeometry(rand15, rand15, rand15);

    //   //new THREE.Mesh(geometry, material.clone())
    //   particles[i] = new THREE.Sprite(material.clone());
    //   particles[i].scale.set(2, 2.1)
    //   particles[i].position.set(rand15 * 1, 0, rand15 * 1)
    //     // level.scene.add(particles[i])
    //     // console.log(particles[0].material)
    //   container.add(particles[i]);
    // }

    // light = new THREE.PointLight(0xff6600, 1, 500, 2);
    // container.add(line)
    // container.add(planeMesh)

  }

  init();

  // funkcja publiczna zwracająca obiekt kontenera
  // czyli nasze światło wraz z bryłą

  this.getElementSiatki = function() {
    return container;
  }

  // inne funkcje publiczne, np zmiana koloru bryły, zmiana koloru światła

  this.updateFire = function() {
    for (let value of particles) {
      // console.log(value)


      value.position.x -= rand(-0.8, 0.8);
      value.position.y += rand(0, 1);
      value.position.z -= rand(-0.8, 0.8);

      value.material.opacity -= 0.020;

      // console.log(value.material)

      if (value.position.y > 25) {
        var rand15 = rand(1, 5)

        value.position.set(rand15 * 2, 0, rand15 * 2)
        value.material.opacity = 1;
      }
      /*
          
      - kiedy osiągnie odpowiednią pozycje np 20, ustaw go na y = 0 lub w losowej pozycji  0 - 5

      - wylosuj też x i z w celu poszerzenia zasięgu ogniska

      - zmniejszaj opacity o 0.01 

      - losuj każdej cząsteczce szybkość poruszania się w górę

      - kiedy pozycja cząsteczki jest większa od 20 zeruj ją i ustawiaj opacity na = 1

      */


    }
  }

}