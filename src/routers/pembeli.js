const Router = require("express").Router();
const pembeli = require("./../controllers/pembeli");

Router.post("/add", pembeli.addPembeli);
Router.get("/all", pembeli.findAllPembeli);
Router.post("/edit", pembeli.editPembeli);

module.exports = Router;