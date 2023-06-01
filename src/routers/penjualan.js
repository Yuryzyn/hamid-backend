const Router = require("express").Router();
const jual = require("../controllers/Penjualan");

Router.post("/add", jual.addPenjualan);
Router.get("/all", jual.allPenjualan);
Router.post("/deliver", jual.checkPengiriman);
Router.post("/finished", jual.checkSelesaiPenjualan);
Router.post("/cancel", jual.checkSelesaiPenjualan);

module.exports = Router;