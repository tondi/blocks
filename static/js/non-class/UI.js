let UI = {
  nodes: {
    info: document.querySelector(".info"),
    login: document.querySelector("#login"),
    password: document.querySelector("#password")
  },

  getUserCredientals: function() {
    let login = UI.nodes.login.value;
    let password = UI.nodes.password.value;
    console.log(login, password)
    let data = {
      name: login,
      password: password
    }
    return data;
  },

  showInfo: function(text) {
    UI.nodes.info.classList.remove("hidden");
    UI.nodes.info.classList.add("visible");
    // UI.nodes.info.classList.toggle("hidden");

    UI.nodes.info.innerHTML = text;
    setTimeout(() => {
      UI.nodes.info.classList.remove("visible");
      UI.nodes.info.classList.add("hidden");

    }, 1500)
  },

  registerOperations: function() {

    let data = UI.getUserCredientals();
    network.register(data)

    // transforms buitton back into login bt
    // registerBt must be dynamic because we swap its id
    let registerBt = document.querySelector(".register-bt");
    registerBt.removeEventListener("mousedown", UI.registerOperations)
    registerBt.value = "Zaloguj"
    registerBt.className = "login-bt"



  }
}


document.querySelector(".register").addEventListener("mousedown", () => {
  // transforms buitton to register-bt
  let loginBt = document.querySelector(".login-bt")
  loginBt.value = "Zarejestruj";
  loginBt.className = "register-bt";
  // document.addEventListener()
  // console.log(loginBt)
  let registerBt = document.querySelector(".register-bt");
  registerBt.addEventListener("mousedown", UI.registerOperations)
})

document.querySelector(".login-bt").addEventListener("mousedown", () => {
  let data = UI.getUserCredientals();
  network.login(data);
})