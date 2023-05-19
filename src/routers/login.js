const Router = require("express").Router();
const login = require("./../controllers/login");

Router.post("register/", login.register);
Router.post("login/", login.usrLogin);
Router.post("update/", login.resetUsernamePassword);
// Router.post("/find", pembeli.findPembeli);

module.exports = Router;