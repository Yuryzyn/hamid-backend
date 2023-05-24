const Router = require("express").Router();
const barang = require("./../controllers/barang");

Router.post("/add", barang.addBarang);
Router.get("/all", barang.findAllBarang);
Router.post("/edit", barang.editBarang);
// Router.post("/find", barang.findBarang);

module.exports = Router;