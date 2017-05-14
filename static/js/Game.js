function Game() {
  this.center = new THREE.Vector3(375, 0, 375)
  this.currentBlock = null;

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

  this.addBlock = function addBlock(x = 0, y = 0, z = 0) {
    var klocek = (new Klocek()).getKlocek();
    main.scene.add(klocek)
    klocek.position.set(x, y, z)
    this.currentBlock = klocek;

    // console.log(this.currentBlock)
  }

  this.changeBlockColor = function(color) {
    console.log(this.currentBlock.children[1].material)
      // console.log(...color.reverse())
    this.currentBlock.children[0].material.color.setHex(color);
    this.currentBlock.children[1].material.color.setHex(color);

  }


  //   console.log(main.scene.children)
  //   console.log(main.scene.children)







  this.arrow = {};
  this.arrow.angle = 0;


}