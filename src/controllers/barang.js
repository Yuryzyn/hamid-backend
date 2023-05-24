const mongoose = require("mongoose");
const barang = require("./../models/barang");
// const { deleteAkun, findAkun } = require("./login")
const ObjectId = mongoose.Types.ObjectId;
const Axios = require("axios");
const { response } = require("express");

class BarangController {
    
    static addBarang(req, res, next){
        let data = req.body
        
        barang.find({jenis : data.jenis, merk : data.merk})
        .then((response)=>{
            if(response.length === 0){
                barang.create({
                    jenis : data.jenis,
                    merk : data.merk,
                    hargaBeli : data.hargaBeli,
                    hargaJual : data.hargaJual,
                    fotoBarang : data.fotoBarang,
                }).then((r)=>{
                    res.status(200).json({
                        message: "Berhasil mengirim data barang",
                    })
                })
            } else {
                throw { status: 400, message: "Jenis dan Merk barang yang di tulis sudah terdaftar!" };
            }
        }).catch(next)

    }

    static findAllBarang(req, res, next){

        barang.find ({}).then((response)=>{
            res.status(200).json({
                data : response,
                message: "Berhasil memuat database barang"
            })
        })
        .catch(next)
    }

    // static findBarang(req, res, next){

    //     let _id = req.body
    //     barang.find ({
    //         _id
    //     }).then((response)=>{
    //         if(response.length!=0){
    //             res.status(200).json({
    //                 data: response,
    //                 message: "FindByIdBarang"
    //             })
    //             console.log("FindByIdBarang>>>")
    //         }else{
    //             res.json({
    //                 message:"Data tidak ditemukan"
    //             })
    //             console.log("FindByIdBarang???")  
    //         }

    //     }).catch(next)
    // }

    static editBarang (req, res, next){
        let data = req.body

        barang.findOneAndUpdate({
            _id : data._id
        },{
            jenis : data.jenis,
            merk : data.merk,
            hargaBeli : data.hargaBeli,
            hargaJual : data.hargaJual,
            fotoBarang : data.fotoBarang,
            
        }).then((r)=>{
            res.status(200).json({
                message: "Berhasil edit data barang"
            })
        }).catch(next)

    }
}

module.exports = BarangController;