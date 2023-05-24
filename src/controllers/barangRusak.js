const mongoose = require("mongoose");
const retur = require("./../models/barangRusak");
const ObjectId = mongoose.Types.ObjectId;
const Axios = require("axios");
const { response } = require("express");
// const { editStockGudang } = require("./gudang");
const gudang = require("../models/gudang");

class barangRusakController {

    static addBarangRusak(req, res, next){
        
        let {idBarang, keteranganRusak,jumlahRusak} = req.body
        retur.create({
            idBarang,
            keteranganRusak,
            jumlahRusak,
            
        }).then((res)=>{
            if (idBarang = ""){
                throw res.status(403).json({
                    message : "lohe?"
                })
            } else {
                gudang.findOneAndUpdate({idBarang},{jumlahRusak})
            }
        // }).then((r)=>{
        //     res.status(200).json({
        //         message: "Berhasil mengirim data barang retur"
        //     })
        }).catch(next)

    }

    static findAllBarangRusak(req, res, next){

        retur.find ({}).then((response)=>{
            res.status(200).json({
                data : response,
                message: "Berhasil memuat database barang retur"
            })
        })
        .catch(next)
    }

    static editBarangRusak (req, res, next){
        let data = req.body

        retur.findOneAndUpdate({
            _id : data._id
        },{
            keteranganRusak : data.keteranganRusak,
            jumlahRusak : data.jumlahRusak,
            
        }).then((r)=>{
            res.status(200).json({
                message: "Berhasil edit data retur"
            })
        }).catch(next)

    }

    static checkRetur (req, res, next){
        let {_id, statusRetur} = req.body

        retur.findByIdAndUpdate({
            _id
        },{
            statusRetur
        }).then((r)=>{
            res.status(200).json({
                message: "Barang sudah di Retur"
            })
        }).catch(next)
    }

}

module.exports = barangRusakController;