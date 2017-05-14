// keyboard events
// 1,2,3 - color

document.addEventListener("keydown", (e) => {
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
  }
})