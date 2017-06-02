// TODO: pass admuin credientals and click register - logins instantly
let UI = {
  nodes: {
    info: document.querySelector(".info"),
    loginContainer: document.querySelector(".login-container"),
    login: document.querySelector("#login"),
    password: document.querySelector("#password"),
    loggedAs: document.querySelector(".user-info__logged-as"),
    userInfoContainer: document.querySelector(".user-info-container"),
    buildingsContainer: document.querySelector(".buildings-container"),
    buildingsList: document.querySelector(".buildings__list"),
    buildingsHeader: document.querySelector(".buildings__header__content"),
    buildingsHeaderContainer: document.querySelector(".buildings__header"),

  },

  showUsers: function(data) {
    console.log("Users:", data)

    UI.nodes.buildingsHeader.innerHTML = "Users";
    // remove prev in case user logged out and in immediately
    // for development
    UI.nodes.buildingsList.innerHTML = "";

    // remove arrow if was added prevroiusly
    let arrow = document.querySelector(".buildings__header__go-back");
    if (arrow !== null) {
      arrow.remove();
    }

    // Dynamicaly create new user element
    // Funciton used to gain clarification
    function createUserElement(userName, numOfProjects) {
      var user = document.createElement("div");
      user.classList.add("buildings__user")

      var img = document.createElement("i");
      img.classList.add("fa");
      img.classList.add('fa-user')
      img.classList.add("buildings__project__image")

      var text = document.createElement('div');
      text.classList.add("buildings__user__text")

      user.appendChild(img)
      user.appendChild(text)

      var name = document.createElement('div')
      name.classList.add("buildings__user__text__name")
      name.innerHTML = userName;
      // console.log("data:", data)

      var projectsNumber = document.createElement('div')
      projectsNumber.classList.add('buildings__user__text__projects-number')
      projectsNumber.innerHTML = "Projects: " + numOfProjects;


      text.appendChild(name)
      text.appendChild(projectsNumber)

      UI.nodes.buildingsList.appendChild(user)

      // links to user projects
      user.addEventListener("click", function() {
        // console.log("preess", data)

        // passed user name
        // TODO Fix Hard coded dependency
        let userName = this.childNodes[1].childNodes[0].innerHTML;

        // morph it into array
        // showProjects gets array natively
        let arr = data[userName];
        // console.log("finish", arr)
        UI.showProjects(arr, data)
          // console.log()
      })
    }

    for (let property in data) {
      if (data.hasOwnProperty(property)) {
        createUserElement(property, data[property].length)
      }
    }

  },
  showProjects(data, completeData = null) {
    console.log("complete:", completeData)

    UI.nodes.buildingsHeader.innerHTML = "Projects";

    // Remove arrow if added previously
    // Most straight method, iterating over parent to find child with class is bad
    let arrow = document.querySelector(".buildings__header__go-back");
    if (arrow !== null) {
      arrow.remove();
    }

    if (game.userName == "admin") {
      let goBack = document.createElement("div");
      goBack.classList.add("buildings__header__go-back");

      let i = document.createElement("i");
      i.classList.add("fa");
      i.classList.add("fa-arrow-left");

      goBack.appendChild(i)
        // UI.nodes.buildingsHeaderContainer.appendChild(goBack);
      UI.nodes.buildingsHeaderContainer.insertBefore(goBack, UI.nodes.buildingsHeader);

      goBack.addEventListener("click", () => {
        if (completeData === null) {

          network.getAllUsers().then(users => {
            completeData = users;
            UI.showUsers(completeData);
          });
        }
        UI.showUsers(completeData);
      })
    }
    // if previously viewed
    if (UI.nodes.buildingsList.innerHTML) {
      UI.nodes.buildingsList.innerHTML = "";
    }

    function createProjectElement(projectData) {
      let projectDate = projectData.date;
      let numberOfBlocks = projectData.buildings.length;
      var project = document.createElement("div");
      project.classList.add("buildings__project")

      var img = document.createElement("i");
      img.classList.add("fa");
      img.classList.add('fa-paper-plane')
      img.classList.add("buildings__project__image")


      var text = document.createElement('div');
      text.classList.add("buildings__project__text")

      project.appendChild(img)
      project.appendChild(text)

      var date = document.createElement('div')
      date.classList.add("buildings__project__text__name") // not really, but it saves a lot of scss due to x,y{&_z}
      date.innerHTML = projectDate;
      // console.log("data:", data)

      var projectsNumber = document.createElement('div')
      projectsNumber.classList.add('buildings__project__text__projects-number')
      projectsNumber.innerHTML = "Blocks: " + numberOfBlocks;


      text.appendChild(date)
      text.appendChild(projectsNumber)

      UI.nodes.buildingsList.appendChild(project)

      // add to scene
      project.addEventListener("click", function() {
        UI.showInfo("Loading..").then(() => {
          game.loadProject(projectData.buildings)
        })
      })
    }

    if (data.length) {
      for (let value of data) {
        // console.log("date:", value.date)
        createProjectElement(value)
      }
    }
    // and at the end add save button
    // <input class="buildings__save" type="button" value="Save"></input>
    let save = document.createElement("input");
    save.classList.add("buildings__save");
    save.type = "button";
    save.value = "Save Project";
    UI.nodes.buildingsList.appendChild(save)

    save.addEventListener("mousedown", () => {
      network.saveBuildings()
    })
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
    // Optional promise, used only in load project
    return new Promise(resolve => {
      UI.nodes.info.innerHTML = text;
      UI.nodes.info.classList.remove("hidden");
      UI.nodes.info.classList.add("visible");
      // UI.nodes.info.classList.toggle("hidden");
      setTimeout(() => {
        UI.nodes.info.classList.remove("visible");
        UI.nodes.info.classList.add("hidden");

        resolve();
      }, 1500)

    })

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

UI.nodes.login.addEventListener("keydown", (e) => {
  if (e.keyCode == 13) {
    let data = UI.getUserCredientals();
    network.login(data);
  }
})

UI.nodes.password.addEventListener("keydown", (e) => {
  if (e.keyCode == 13) {
    let data = UI.getUserCredientals();
    network.login(data);
  }
})


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

document.querySelector(".user-info__log-out").addEventListener("mousedown", () => {
  network.logOut();
})