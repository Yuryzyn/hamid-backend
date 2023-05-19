const { response,request } = require("express");
const e = require("express");
const barang = require("./../models/barang");
// const Axios = require("axios");
// const { default: axios } = require("axios");
// const { create } = require("./../models/pembeli");

class BarangController {
    
    static addBarang(req, res){
        
        let {namaBarang,tipeBarang,hargaBeli,hargaJual,fotoBarang} = req.body
        barang.create({
            namaBarang,
            tipeBarang,
            hargaBeli,
            hargaJual,
            fotoBarang,
            
        }).then((r)=>{
            res.status(200).json({
                message: "Berhasil mengirim data barang"
            })
        }).catch((error)=>{
            res.status(400).json({
                message: "Gagal mengirim data barang"
            })
            console.log(error)
            console.log("addBarang!!!")
        })

    }

    static findAllBarang(req, res){

        barang.find ({}).then((response)=>{
            res.status(200).json({
                data : response,
                message: "Berhasil memuat database barang"
            })
        })
        .catch((response)=>{
            res.status(400).json({
                data: response,
                message: "Gagal memuat database barang"
            })
            console.log(error)
            console.log("findAllBarang!!!")
        })
    }

    static findBarang(req, res){

        let _id = req.body
        barang.find ({
            _id
        }).then((response)=>{
            if(response.length!=0){
                res.status(200).json({
                    data: response,
                    message: "FindByIdBarang"
                })
                console.log("FindByIdBarang>>>")
            }else{
                res.json({
                    message:"Data tidak ditemukan"
                })
                console.log("FindByIdBarang???")  
            }

        }).catch((response)=>{
            res.status(400).json({
                message: "Koneksi gagal"
            })
            console.log("FindByIdBarang!!!")
        })
    }

    static editBarang (req, res){
        let data = req.body

        barang.findOneAndUpdate({
            _id : data._id
        },{
            namaBarang : data.namaBarang,
            tipeBarang : data.tipeBarang,
            hargaBeli : data.hargaBeli,
            hargaJual : data.hargaJual,
            fotoBarang : data.fotoBarang,
            
        }).then((r)=>{
            res.status(200).json({
                message: "Berhasil edit data barang"
            })
        }).catch((error)=>{
            res.status(400).json({
                message:"Gagal edit data barang"
            })
            console.log(error)
            console.log("editDatabarang!!!")
        })

    }
}

module.exports = BarangController;