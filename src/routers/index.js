const express = require("express");
const Router = express.Router();

const akun = require("./akun");
const pembeli = require("./pembeli");
const barang = require("./barang");
const gudang = require("./gudang");

Router.use("/Akun",akun);
Router.use("/pembeli",pembeli);
Router.use("/barang",barang);
Router.use("/gudang",gudang);
Router.get("/", (req, res) => {
    res.send("Server Hamid : Online!");
})

module.exports = Router;