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
    this.currentBlock.userData.countAddedX = 1;
    this.currentBlock.userData.countAddedZ = 1;


    // console.log(this.currentBlock)
  }

  this.changeBlockColor = function(color) {
    // console.log(this.currentBlock.children)
    this.currentBlock.children.forEach(function(el) {
      //   console.log(el)
      if (el.children.length) {
        el.children.forEach(function(inEl) {
          //   console.log("inel: ", inEl);
          inEl.material.color.setHex(color);
        })
      } else {
        el.material.color.setHex(color);
      }
    })



  }

  // Every new subblock adds to block object3d container 
  this.changeBlockSize = function(direction) {
    console.log(this.currentBlock)

    if (direction == "x") {
      for (let i = 0; i < this.currentBlock.userData.countAddedZ; i++) {
        // var additionalBlocks = [];

        let additionalOne = (new Klocek).getKlocek()
          // additionalBlocks.push();
        additionalOne.position.set(this.currentBlock.userData.countAddedX * 50, 0, i * 50)
        this.currentBlock.add(additionalOne)

      }
      //   additionalBlock.position.set(this.currentBlock.userData.countAddedX * 50, 0, 0)
      this.currentBlock.userData.countAddedX++;
    }
    if (direction == "z") {
      for (let i = 0; i < this.currentBlock.userData.countAddedX; i++) {
        // var additionalBlocks = [];

        let additionalOne = (new Klocek).getKlocek()
          // additionalBlocks.push();
        additionalOne.position.set(i * 50, 0, this.currentBlock.userData.countAddedZ * 50)
        this.currentBlock.add(additionalOne)

      }
      //   additionalBlock.position.set(this.currentBlock.userData.countAddedX * 50, 0, 0)
      this.currentBlock.userData.countAddedZ++;
    }
    // this.currentBlock.children[0].material.color.setHex(color);
    // console.log(main.scene.children)
  }

  this.changeBlockRotation = function(rad) {
    this.currentBlock.rotateY(rad)

  }


  //   console.log(main.scene.children)
  //   console.log(main.scene.children)


}