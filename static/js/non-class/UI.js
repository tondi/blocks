// TODO: pass admuin credientals and click register - logins instantly

let UI = {
  nodes: {
    info: document.querySelector(".info"),
    loginContainer: document.querySelector(".login-container"),
    login: document.querySelector("#login"),
    password: document.querySelector("#password"),
    loggedAs: document.querySelector(".user-info__logged-as"),
    userInfoContainer: document.querySelector(".user-info-container"),
    buildingsContainer: document.querySelector(".buildings-container")
  },

  getUserCredientals: function() {
    let login = UI.nodes.login.value;
    let password = UI.nodes.password.value;
    let data = {
      name: login,
      password: password
    }
    console.log(data)
    return data;
  },

  showInfo: function(text) {
    UI.nodes.info.innerHTML = text;
    UI.nodes.info.classList.remove("hidden");
    UI.nodes.info.classList.add("visible");
    // UI.nodes.info.classList.toggle("hidden");

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
    registerBt.value = "Zaloguj"
    registerBt.removeEventListener("mousedown", UI.registerOperations)
    registerBt.className = "login-bt"
  }
}


document.querySelector(".register").addEventListener("mousedown", () => {
  // transforms buitton to register-bt
  let loginBt = document.querySelector(".login-bt")
  loginBt.value = "Zarejestruj";
  loginBt.className = "register-bt";
  // document.addEventListener()
  let registerBt = document.querySelector(".register-bt");
  registerBt.addEventListener("mousedown", UI.registerOperations)
})

document.querySelector(".login-bt").addEventListener("mousedown", () => {
  let data = UI.getUserCredientals();
  network.login(data);
})

document.querySelector(".save-building").addEventListener("mousedown", () => {
  // let data = UI.getUserCredientals();
  // network.login(data);
  network.saveBuildings()
})

document.querySelector(".user-info__log-out").addEventListener("mousedown", () => {
  network.logOut();
})