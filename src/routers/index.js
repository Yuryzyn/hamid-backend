const express = require("express");
const Router = express.Router();

const akun = require("./akun");
const pembeli = require("./pembeli");
// const barang = require("./barang");
const gudang = require("./gudang");
const penjualan = require("./penjualan");

Router.use("/Akun",akun);
Router.use("/pembeli",pembeli);
// Router.use("/barang",barang);
Router.use("/gudang",gudang);
Router.use("/penjualan",penjualan);
Router.get("/", (req, res, next) => {
    res.send("Server Hamid : Online!");
})

module.exports = Router;