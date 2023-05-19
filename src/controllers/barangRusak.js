const { response,request } = require("express");
const e = require("express");
const retur = require("./../models/barangRusak");

class barangRusakController {

    static addBarangRusak(req, res){
        
        let {idBarang, keterangan,buktiFoto,jumlah} = req.body
        retur.create({
            idBarang,
            keterangan,
            buktiFoto,
            jumlah,
            
        }).then((r)=>{
            res.status(200).json({
                message: "Berhasil mengirim data barang retur"
            })
        }).catch((error)=>{
            res.status(400).json({
                message: "Gagal mengirim data barang retur"
            })
            console.log(error)
            console.log("addBarangRusak!!!")
        })

    }

    static findAllBarangRusak(req, res){

        retur.find ({}).then((response)=>{
            res.status(200).json({
                data : response,
                message: "Berhasil memuat database barang retur"
            })
        })
        .catch((response)=>{
            res.status(400).json({
                data: response,
                message: "Gagal memuat database barang retur"
            })
            console.log(error)
            console.log("findStockBarangRusak!!!")
        })
    }

    static editBarangRusak (req, res){
        let data = req.body

        retur.findOneAndUpdate({
            _id : data._id
        },{
            idBarang : data.idBarang,
            keterangan : data.keterangan,
            buktiFoto : data.buktiFoto,
            jumlah : data.jumlah,
            status : data.status,
            
        }).then((r)=>{
            res.status(200).json({
                message: "Berhasil edit data retur"
            })
        }).catch((error)=>{
            res.status(400).json({
                message:"Gagal edit data retur"
            })
            console.log(error)
            console.log("editBarangRusak!!!")
        })

    }

}

module.exports = barangRusakController;