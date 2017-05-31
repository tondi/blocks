module.exports = function() {

  var opers = {

    // wstawienie jednego "rekordu" do dokumentu - INSERT

    AddUser: function(Model, data, cb) {
      // TODO: Size of collections
      // Model.collection.stats(function(err, results) {
      //   console.log(results.storageSize);
      // });

      let any = new RegExp(".");
      // In our case rejection is success "User with this name was not found we can add it"
      opers.ValidateUser(Model, data.name, any).catch((resp) => {
        console.log("resp:", resp)


        data.save(function(error, data, dodanych) {
          console.log("added " + data)
          if (error) {
            let response = {
              success: false,
              text: "Błąd rejestracji użytkownika"
            }
            cb(response);
            return console.error(error);

          }
          let response = {
            success: true,
            text: "Zarejestrowano"
          }
          cb(response)

        })
      }).then((data) => {

        cb({ success: false, text: "User already exists" })
        console.log("user already exists")
      })


    },

    //pobranie z ograniczeniem ilości i warunkiem - WHERE, LIMIT

    ValidateUser: function(Model, name, password) {
      return new Promise((resolve, reject) => {
        Model.find({ name: name, password: password }, function(err, data) {
          if (err) {
            reject(err);
          }
          console.log(data);
          if (data.length) {
            let response = {
              success: true,
              text: "Successfuly logged in",
              name: name
            }
            resolve(response);
          } else {
            let response = {
              success: false,
              text: "User does not exist or password invalid",
              name: name
            }
            reject(response)
          }

        }).limit(1);
      })
    },

    // pobranie wszystkich "rekordów" z dokumentu - SELECT
    // zwracamy uwagę na argument Model

    SaveProject: function(data) {
      return new Promise((resolve, reject) => {
        data.save(function(error, data, dodanych) {
          console.log("added " + data)
            // console.log(error)
          if (error) {
            let response = {
              success: false,
              text: "Błąd dodawania projektu"
            }
            reject(response);
            // return console.error(error);
          }
          let response = {
            success: true,
            text: "Zapisano projekt"
          }
          resolve(response)

        })
      })

    },

    SelectUserProjects: function(Model, name) {
      return new Promise((resolve, reject) => {
        Model.find({ login: name }, function(err, data) {
          if (err) {
            reject(err);
          }
          // console.log(data);
          if (data.length) {
            let response = {
              success: true,
              text: "User projects found",
              data: data
            }
            resolve(response);
          } else {
            let response = {
              success: false,
              text: "User does not have projects"
            }
            reject(response)
          }

        }); //.limit(1)
      })
    },


    SelectAll: function(Model, callback) {
      Model.find({}, function test(err, data) {
        if (err) return console.error(err);
        // console.log(data);
        callback(data)
      })
    },

    //pobranie z ograniczeniem ilości i warunkiem - WHERE, LIMIT

    // SelectByImie: function(Model, imie, count, callback) {
    //   Model.find({ name: imie }, function(err, data) {
    //     if (err) return console.error(err);
    //     // console.log(data);
    //     callback(data);
    //   }).limit(count)
    // },

    //aktualizacja - np zamiana imienia - UPDATE

    UpdateImie: function(Model, oldName, newName) {
      Model.update({ imie: oldName }, { imie: newName }, function(err, data) {
        if (err) return console.error(err);
        console.log(data);
      })
    },

    //usuniecie danych - DELETE

    DeleteAll: function(Model) {
      Model.remove(function(err, data) {
        if (err) return console.error(err);
        // console.log(data);
      })
    },

    DeleteOne: function(Model, user, callback) {
      //   opers.SelectByImie(Model, user, 1, data => {
      //     console.log(data)
      //   })
      console.log("user to be removed: ", user)
      Model.remove({ name: user }, function(err, data) {
        // console.log(result)
        // ew info o usunieciu
        if (err) return console.error(err);
        callback(data)
      });


      //   Model.remove({ name: user }, { justOne: true })

    }

    // pozostałe niezbędne operacje trzeba sobie dopisać samemu, 
    // na podstawie dokumentacji Mongoose
  }

  return opers;

}