const Router = require("express").Router();
const login = require("../controllers/login");
const { jwtAuthenticate } = require("../middlewares/auth");

Router.post("/register", login.register);
Router.post("/login", login.LoginKaryawan)
Router.get("/root-pegawai", jwtAuthenticate, login.findAkun);
Router.get("/refresh", jwtAuthenticate, login.refreshLogin);
Router.patch("/update", jwtAuthenticate, login.resetUsernamePassword);
Router.delete("/delete", jwtAuthenticate, login.deleteAkun);

module.exports = Router;