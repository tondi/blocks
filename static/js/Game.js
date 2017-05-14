function Game() {

  //   console.log(main)
  var el = (new ElementSiatki()).getElementSiatki();
  main.scene.add(el)


  var klocek = (new Klocek()).getKlocek();
  main.scene.add(klocek)
    //   console.log(main.scene.children)
  console.log(main.scene.children)

  //   document.addEventListener("keydown", (evt) => {
  //     //console.log(evt)
  //     switch (evt.which) {
  //       case 37:
  //         { // left
  //           //   console.log("left")
  //           //moveLights(selectedLight, "left");
  //           arrow.left = 1;

  //           break;
  //         }

  //       case 38:
  //         { // up
  //           arrow.up = 1;
  //           break;
  //         }
  //       case 39:
  //         { // right
  //           //moveLights(selectedLight, "right")
  //           arrow.right = 1;
  //           break;
  //         }
  //       case 40:
  //         { // down
  //           arrow.down = 1;
  //           break;
  //         }
  //       default:
  //         return; // exit this handler for other keys
  //     }
  //     evt.preventDefault(); // prevent the default action (scroll / move caret)
  //   })

  //   document.addEventListener("keyup", (evt) => {
  //     switch (evt.which) {
  //       case 37:
  //         { // left
  //           arrow.left = 0;
  //           break;
  //         }
  //       case 38:
  //         { // up
  //           arrow.up = 0;
  //           break;
  //         }
  //       case 39:
  //         { // right
  //           arrow.right = 0;
  //           break;
  //         }
  //       case 40:
  //         { // down
  //           arrow.down = 0;
  //           break;
  //         }
  //       default:
  //         return; // exit this handler for other keys
  //     }
  //   })

}