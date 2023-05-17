const { response,request } = require("express");
const e = require("express");
const stock = require("./../models/gudang");
// const Axios = require("axios");
// const { default: axios } = require("axios");
// const { create } = require("./../models/pembeli");

class GudangController {
    
    static addGudang(req, res){
        
        let {idBarang,jumlahBarang,idRusak,jumlahRusak} = req.body
        stock.create({
            idBarang,
            jumlahBarang,
            idRusak,
            jumlahRusak,

        }).then((r)=>{
            res.status(200).json({
                message: "Berhasil mengirim data stok gudang"
            })
        }).catch((error)=>{
            res.status(400).json({
                message: "Gagal mengirim data stok gudang"
            })
            console.log(error)
            console.log("addGudang!!!")
        })

    }

    static findAllStockGudang(req, res){

        stock.find ({}).then((response)=>{
            res.status(200).json({
                data : response,
                message: "Berhasil memuat database stok gudang"
            })
        })
        .catch((response)=>{
            res.status(400).json({
                data: response,
                message: "Gagal memuat database stok gudang"
            })
            console.log(error)
            console.log("findStockGudang!!!")
        })
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

    static editStockGudang (req, res){
        let data = req.body

        stock.findOneAndUpdate({
            _id : data._id
        },{
            idBarang : data.idBarang,
            jumlahBarang : data.jumlahBarang,
            idRusak : data.idRusak,
            jumlahRusak : data.jumlahRusak,
            
        }).then((r)=>{
            res.status(200).json({
                message: "Berhasil edit data stok gudang"
            })
        }).catch((error)=>{
            res.status(400).json({
                message:"Gagal edit data stok gudang"
            })
            console.log(error)
            console.log("editStockGudang!!!")
        })

    }
}

module.exports = GudangController;