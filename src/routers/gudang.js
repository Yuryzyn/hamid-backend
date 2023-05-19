const Router = require("express").Router();
const gudang = require("./../controllers/gudang");
const retur = require("./../controllers/barangRusak");

Router.post("/addstock", gudang.addGudang);
Router.get("/allstock", gudang.findAllStockGudang);
Router.post("/editstock", gudang.editStockGudang);
Router.post("/addretur", retur.addBarangRusak);
Router.get("/allretur", retur.findAllBarangRusak);
Router.post("/editretur", retur.editBarangRusak);
// Router.post("/find", barang.findBarang);

module.exports = Router;