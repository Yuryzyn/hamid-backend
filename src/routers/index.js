const express = require("express");
const Router = express.Router();

const karyawan = require("./karyawan.js");
const pembeli = require("./pembeli.js");
// const Admin = require("./admin.js");

Router.use("/karyawan",karyawan);
Router.use("/pembeli",pembeli);
// Router.use("/admin",Admin);

module.exports = Router;