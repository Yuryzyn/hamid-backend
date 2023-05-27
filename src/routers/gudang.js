const Router = require("express").Router();

const gudang = require("./../controllers/gudang");
Router.post("/add-stock", gudang.addStockGudang);
Router.get("/all-stock", gudang.findAllStockGudang);
Router.post("/edit-stock", gudang.editStockGudang);

const retur = require("./../controllers/barangRusak");
Router.post("/add-retur", retur.addBarangRusak);
Router.get("/all-retur", retur.findAllBarangRusak);
Router.post("/edit-retur", retur.editBarangRusak);
Router.post("/done-retur", retur.checkRetur);

const barang = require("./../controllers/barang");
Router.post("/add-item", barang.addBarang);
Router.get("/all-item", barang.findAllBarang);
Router.post("/edit-item", barang.editBarang);

const masuk = require("./../controllers/barangMasuk");
Router.post("/add-restock",masuk.addBarangMasuk);
Router.get("/all-restock", masuk.daftarBarangMasuk);
Router.post("/edit-restock", masuk.editDataBarangMasuk);
Router.post("/done-restock", masuk.checkMarkBarangBaru);

module.exports = Router;