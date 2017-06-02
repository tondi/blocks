// TODO
// remove unnecessary emits in changeBlocksize
// building multi level with rotation on main block

function Game() {
  this.center = new THREE.Vector3(375, 0, 375)
  this.currentBlock = null;
  this.buildingAllowed = false;
  this.buildings = []
  this.userName = "";

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

    let light = (new Light()).getLight();
    // console.log(game)
    light.position.set(375, 1000, -375);
    main.scene.add(light)

  }

  initBoard()
    //   console.log(main)


  // DIFFRENT THAN ADD LEGACY
  // Changed name | added z
  this.addBlock = function addBlock(x = 0, y = 0, z = 0) {
    // console.log(this.currentBlock)
    if (this.buildingAllowed) {

      var klocek = (new Klocek()).getKlocek();
      main.scene.add(klocek)
      klocek.position.set(x * 50, y * 30, z * 50)
      klocek.name = `block_${x}_${z}_${y}`

      this.currentBlock = klocek;
      this.currentBlock.userData.countAddedX = 1;
      this.currentBlock.userData.countAddedZ = 1;
      this.currentBlock.userData.countAddedY = 1;
      this.currentBlock.userData.rotation = 0;

      // TODO: Figure if broadcast
      network.addBlock(this.currentBlock);

      // console.log(this.currentBlock)
    }

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

    // console.log(color)
    this.currentBlock.userData.color = color;

    // socket
    network.changeBlockColor(color);
  }

  // Every new subblock adds to block object3d container
  this.changeBlockSize = function(direction) {
    // console.log(this.currentBlock)

    if (direction == "x") {
      for (let i = 0; i < this.currentBlock.userData.countAddedZ; i++) {
        // var additionalBlocks = [];
        let additionalOne = (new Klocek).getSingleBlock()

        additionalOne.name = `subBlock_${this.currentBlock.userData.countAddedX}_${i}_${this.currentBlock.userData.countAddedY}`
        additionalOne.userData.countAddedY = 1;
        // additionalBlocks.push();
        additionalOne.position.set(this.currentBlock.userData.countAddedX * 50, 0, i * 50)
        this.currentBlock.add(additionalOne)
          // console.log("adding block with y coordinats:", this.currentBlock.userData.countAddedY)


      }
      //   additionalBlock.position.set(this.currentBlock.userData.countAddedX * 50, 0, 0)
      this.currentBlock.userData.countAddedX++;
    }
    if (direction == "z") {
      for (let i = 0; i < this.currentBlock.userData.countAddedX; i++) {
        // var additionalBlocks = [];

        let additionalOne = (new Klocek).getSingleBlock()
        additionalOne.name = `subBlock_${i}_${this.currentBlock.userData.countAddedZ}_${this.currentBlock.userData.countAddedY}`
        additionalOne.userData.countAddedY = 1;
        // additionalBlocks.push();
        additionalOne.position.set(i * 50, 0, this.currentBlock.userData.countAddedZ * 50)
        this.currentBlock.add(additionalOne)
          // console.log("adding block with y coordinats:", this.currentBlock.userData.countAddedY)

      }
      //   additionalBlock.position.set(this.currentBlock.userData.countAddedX * 50, 0, 0)
      this.currentBlock.userData.countAddedZ++;
    }
    // this.currentBlock.children[0].material.color.setHex(color);
    // console.log(main.scene.children)
    network.changeBlockSize(direction);
  }

  this.changeBlockRotation = function(rad) {
    this.currentBlock.rotateY(rad)
    this.currentBlock.userData.rotation += rad;
    network.changeBlockRotation(rad)
  }

  // TODO: Think about synthetyzing with addBlock
  // saves about 50 lines of code
  this.addLegacyBlock = function(block) {

    var klocek = (new Klocek()).getKlocek();
    main.scene.add(klocek)
    console.log(block)
    klocek.position.set(block.x, block.y, block.z)
      // klocek.name = `block_${x}_${z}`

    this.currentBlock = klocek;
    this.currentBlock.userData.countAddedX = 1;
    this.currentBlock.userData.countAddedZ = 1;
  }

  this.changeLegacyBlockColor = function(color) {
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

    // socket
  }

  this.changeLegacyBlockSize = function(direction) {
    console.log(direction)

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

  this.changeLegacyBlockRotation = function(rad) {
    this.currentBlock.rotateY(rad)

  }

  this.clearScene = function() {
    main.scene.children
      .filter(e => {
        return e.name.split("_")[0] === "block"
      })
      .map(e => {
        main.scene.remove(e);
      })
  }

  this.loadProject = function(buildings) {
    console.log("Loading ", buildings)
    this.clearScene();

    for (let value of buildings) {

      let container = new THREE.Object3D();

      let x = Number(value.name.split("_")[1])
      let z = Number(value.name.split("_")[2])
      let y = Number(value.name.split("_")[3])

      if (value.children.length) {
        for (let inner of value.children) {

          let _x = Number(inner.split("_")[1]);
          let _z = Number(inner.split("_")[2]);
          let _y = Number(inner.split("_")[3]);

          var klocek = (new Klocek()).getKlocek();
          container.add(klocek)
          if (value.rotation) {
            klocek.position.set((_x) * 50, 0, (_z) * 50)
          } else {
            klocek.position.set((_x + x) * 50, y * 30, (_z + z) * 50)
          }
          container.name = `block_${x}_${z}_${y}`
        }
      }
      this.currentBlock = klocek;
      this.currentBlock.userData.countAddedX = 1;
      this.currentBlock.userData.countAddedZ = 1;
      this.currentBlock.userData.countAddedY = 1;
      this.currentBlock.userData.rotation = 0;

      main.scene.add(container)
      if (value.rotation) {
        container.rotation.y = value.rotation;
        container.position.set(x * 50, y * 30, z * 50)
      }
      if (value.color) {
        for (let child of container.children) {
          child.children[0].material.color.setHex(value.color);
        }
        // container.material.color = value.color;
      }
    }
    UI.showInfo("Project Loaded")

    // TODO: Figure if broadcast
    network.addBlock(this.currentBlock);

  }


  //   console.log(main.scene.children)
  //   console.log(main.scene.children)


}