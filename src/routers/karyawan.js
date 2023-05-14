const Router = require("express").Router();
const karyawan = require("./../controllers/karyawan");

Router.post("/add", karyawan.addKaryawan);
Router.get("/all", karyawan.findAllKaryawan);
Router.post("/edit", karyawan.editKaryawan);
Router.delete("/delete", karyawan.deleteKaryawan);

module.exports = Router;