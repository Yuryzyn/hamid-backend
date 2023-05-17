const Router = require("express").Router();
const gudang = require("./../controllers/gudang");

Router.post("/addstock", gudang.addGudang);
Router.get("/allstock", gudang.findAllStockGudang);
Router.post("/editstock", gudang.editStockGudang);
// Router.post("/find", barang.findBarang);

module.exports = Router;