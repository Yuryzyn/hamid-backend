const mongoose = require("mongoose");
const stock = require("./../models/gudang");
const ObjectId = mongoose.Types.ObjectId;
const Axios = require("axios");
const { response } = require("express");

class GudangController {
    
    static addGudang(req, res, next){
        let data = req.body

        stock.find({idBarang : data.idBarang})
        .then((response) => {
            if (response.length === 0){
                return stock.create({
                    idBarang : data.idBarang,
                    jumlahBarang : data.jumlahBarang,
                })
            } else {
                return stock.updateOne({idBarang : data.idBarang},{
                    $inc:{jumlahBarang: +data.jumlahBarang}
                })
            }
        }).then((r) => {
            res.status(200).json({
                message: "Berhasil update database stok gudang"
            })
        }).catch(next)

    }

    static findAllStockGudang(req, res, next){

        stock.find({}).then((response)=>{
            res.status(200).json({
                data : response,
                message: "Berhasil memuat database stok gudang"
            })
        })
        .catch(next)
    }

    // static findBarang(req, res){

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

    //     }).catch((response)=>{
    //         res.status(400).json({
    //             message: "Koneksi gagal"
    //         })
    //         console.log("FindByIdBarang!!!")
    //     })
    // }

    static editStockGudang (req, res, next){
        let {idBarang, jumlahBarang, jumlahRusak } = req.body

        stock.findOneAndUpdate({
            idBarang
        },{
            jumlahBarang,
            
        }).then((r)=>{
            res.status(200).json({
                message: "Berhasil edit data stok barang"
            })
        }).catch(next)
    }

    static editStockRusak (req, res, next){
        let {idBarang, jumlahBarang, jumlahRusak } = req.body

        stock.findOneAndUpdate({
            idBarang
        },{
            jumlahRusak,
            
        }).then((r)=>{
            res.status(200).json({
                message: "Berhasil edit data stok barang rusak"
            })
        }).catch(next)

    }
}

module.exports = GudangController;