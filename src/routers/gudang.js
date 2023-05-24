const Router = require("express").Router();
const gudang = require("./../controllers/gudang");
const retur = require("./../controllers/barangRusak");

Router.post("/add-stock", gudang.addGudang);
Router.get("/all-stock", gudang.findAllStockGudang);
Router.post("/edit-stock", gudang.editStockGudang);
Router.post("/add-retur", retur.addBarangRusak);
Router.get("/all-retur", retur.findAllBarangRusak);
Router.post("/edit-retur", retur.editBarangRusak);
Router.post("/done-retur", retur.checkRetur);
// Router.post("/find", barang.findBarang);

module.exports = Router;