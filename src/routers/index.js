const express = require("express");
const Router = express.Router();

const login = require("./login");
const karyawan = require("./karyawan");
const pembeli = require("./pembeli");
const barang = require("./barang");
const gudang = require("./gudang");

Router.use("/Akun",login);
Router.use("/karyawan",karyawan);
Router.use("/pembeli",pembeli);
Router.use("/barang",barang);
Router.use("/gudang",gudang);
Router.get("/", (req, res) => {
    res.send("Server Hamid : Online!");
})

module.exports = Router;