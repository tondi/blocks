function Game() {
  this.center = new THREE.Vector3(375, 0, 375)

  function initBoard() {
    var el = (new ElementSiatki()).getElementSiatki();
    // main.scene.add(el)
    // console.log(el)


    for (let x = 0; x < 15; x++) {
      for (let z = 0; z < 15; z++) {
        // console.log(i)
        // let planeClone = planeMesh.clone()
        // let lineClone = line.clone();


        // container.add(planeClone)
        // container.add(lineClone)
        // lineClone.position.set(x * 50 - 25, 0, z * 50 - 25)
        // planeClone.position.set(x * 50, 0, z * 50)

        let el = (new ElementSiatki()).getElementSiatki();
        el.name = `plane_${x}_${z}`
        el.position.set(x * 50, 0, z * 50)

        main.scene.add(el)
      }
    }
  }
  initBoard()
    //   console.log(main)

  this.addBlock = function addBlock(x, y, z) {
    var klocek = (new Klocek()).getKlocek();
    main.scene.add(klocek)
    klocek.position.set(x, y, z)
  }



  //   console.log(main.scene.children)
  console.log(main.scene.children)







  this.arrow = {};
  this.arrow.angle = 0;
  var moveCamera = function() {

    document.addEventListener("keydown", function(evt) {
      switch (evt.which) {
        case 37:
          { // left
            //   console.log("left")
            //moveLights(selectedLight, "left");
            game.arrow.left = 1;

            break;
          }

        case 38:
          { // up
            game.arrow.up = 1;
            break;
          }
        case 39:
          { // right
            //moveLights(selectedLight, "right")
            game.arrow.right = 1;
            break;
          }
        case 40:
          { // down
            game.arrow.down = 1;
            break;
          }
        default:
          return; // exit this handler for other keys
      }
      evt.preventDefault(); // prevent the default action (scroll / move caret)
    })

    document.addEventListener("keyup", function(evt) {
      switch (evt.which) {
        case 37:
          { // left
            game.arrow.left = 0;
            break;
          }
        case 38:
          { // up
            game.arrow.up = 0;
            break;
          }
        case 39:
          { // right
            game.arrow.right = 0;
            break;
          }
        case 40:
          { // down
            game.arrow.down = 0;
            break;
          }
        default:
          return; // exit this handler for other keys
      }
    })


  }
  moveCamera();
  this.moveCamera = moveCamera

}