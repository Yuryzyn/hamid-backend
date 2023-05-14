const { response,request } = require("express");
const e = require("express");
const pembeli = require("./../models/pembeli");
// const Axios = require("axios");
// const { default: axios } = require("axios");
// const { create } = require("./../models/pembeli");

class PembeliController {
    
    static addPembeli(req, res){
        
        let {nama,tlpn,nik,alamat,editBy} = req.body
        pembeli.create({
            nama,
            tlpn,
            nik,
            alamat,
            editBy
        }).then((r)=>{
            res.status(200).json({
                message: "Berhasil mengirim data pembeli"
            })
        }).catch((error)=>{
            res.status(400).json({
                message: "Gagal mengirim data pembeli"
            })
            console.log(error)
            console.log("addPembeli!!!")
        })

    }

    static findAllPembeli(req, res){

        let data = req.body
        pembeli.find ({}).then((response)=>{
            res.status(200).json({
                data : response,
                message: "Berhasil memuat database pembeli"
            })
            //console.log("DATABASE_CONNECTED" )
        })
        .catch((response)=>{
            res.status(400).json({
                data: response,
                message: "Gagal memuat database pembeli"
            })
            console.log("findAllPembeli!!!")
        })
    }

    static editPembeli (req, res){
        let data = req.body

        pembeli.findOneAndUpdate({
            _id : data._id
        },{
            nama : data.nama,
            tlpn : data.tlpn,
            nik  : data.nik,
            alamat : data.alamat,
            editBy :data.editBy

        }).then((r)=>{
            res.status(200).json({
                message: "Berhasil edit data pembeli"
            })
        }).catch((error)=>{
            res.status(400).json({
                message:"Gagal edit data pembeli"
            })
            console.log(error)
            console.log("editDataPembeli!!!")
        })

    }
}

module.exports = PembeliController;