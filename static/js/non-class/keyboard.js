// keyboard events
// 1,2,3 - color

var keyboard = {}
keyboard.arrow = {};
keyboard.arrow.angle = 0;

function add(evt) {
  switch (evt.which) {
    case 37:
      { // left
        //   console.log("left")
        //moveLights(selectedLight, "left");
        keyboard.arrow.left = 1;

        break;
      }

    case 38:
      { // up
        keyboard.arrow.up = 1;
        break;
      }
    case 39:
      { // right
        //moveLights(selectedLight, "right")
        keyboard.arrow.right = 1;
        break;
      }
    case 40:
      { // down
        keyboard.arrow.down = 1;
        break;
      }
    default:
      return; // exit this handler for other keys
  }
  evt.preventDefault(); // prevent the default action (scroll / move caret)
}
document.addEventListener("keydown", add)

function remove(evt) {
  switch (evt.which) {
    case 37:
      { // left
        keyboard.arrow.left = 0;
        break;
      }
    case 38:
      { // up
        keyboard.arrow.up = 0;
        break;
      }
    case 39:
      { // right
        keyboard.arrow.right = 0;
        break;
      }
    case 40:
      { // down
        keyboard.arrow.down = 0;
        break;
      }
    default:
      return; // exit this handler for other keys
  }
}

document.addEventListener("keyup", remove)

// used by shift
function additionalClick(e) {
  //   console.log("shift +", e.key)
  switch (e.key) {
    case "ArrowLeft":
      {

        console.log("shift +", e.key)
        // console.log(add)
        game.changeBlockSize("x")
        break;
      }
  }
}

document.addEventListener("keydown", e => {
  switch (e.key) {
    case "1":
      {
        // console.log(game.changeBlockColor)
        game.changeBlockColor(0xffffff)
        break;
      }
    case "2":
      {
        // console.log(game.changeBlockColor)
        game.changeBlockColor(0x000)
        break;
      }
    case "3":
      {
        // console.log(game.changeBlockColor)
        game.changeBlockColor(0x990000)
        break;
      }
    case "Shift":
      {
        document.addEventListener("keydown", additionalClick)
        document.removeEventListener("keydown", add)

        break;
      }
  }
})

document.addEventListener("keyup", e => {
  switch (e.key) {
    // Handle sihift to change block size
    case "Shift":
      {
        document.removeEventListener("keydown", additionalClick)
        document.addEventListener("keydown", add)

      }
      break;
  }
})