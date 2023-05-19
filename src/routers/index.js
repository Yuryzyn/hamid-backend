const express = require("express");
const Router = express.Router();

const login = require("./login.js");
const karyawan = require("./karyawan.js");
const pembeli = require("./pembeli.js");
const barang = require("./barang.js");
const gudang = require("./gudang.js");

Router.use("/",login);
Router.use("/karyawan",karyawan);
Router.use("/pembeli",pembeli);
Router.use("/barang",barang);
Router.use("/gudang",gudang);

module.exports = Router;