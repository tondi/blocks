function Game() {

  //   console.log(main)
  var el = (new ElementSiatki()).getElementSiatki();
  main.scene.add(el)


  var klocek = (new Klocek()).getKlocek();
  main.scene.add(klocek)
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