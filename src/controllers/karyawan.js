const { response,request } = require("express");
const e = require("express");
const karyawan = require("./../models/karyawan");
// const Axios = require("axios");
// const { default: axios } = require("axios");
// const { create } = require("./../models/karyawan");

class KaryawanController {

    static addKaryawan(req, res){
        
        let {nama,tlpn,nik,noUser,inf} = req.body
        karyawan.create({
            nama,
            tlpn,
            nik,
            noUser,
            inf,
        }).then((r)=>{
            res.status(200).json({
                message: "Berhasil Mengirim Data karyawan"
            })
        }).catch((error)=>{
            res.status(400).json({
                message: "Gagal mengirim data karyawan"
            })
            console.log(error)
            console.log("addKaryawan!!!")
        })

    }

    static findAllKaryawan(req, res){

        let data = req.body
        karyawan.find ({}).then((response)=>{
            res.status(200).json({
                data: response,
                message: "Berhasil memuat database karyawan"
            })
            //console.log("DATABASE_CONNECTED" )
        })
        .catch((response)=>{
            res.status(400).json({
                data: response,
                message: "Gagal memuat database karyawan"
            })
            console.log("findAllKaryawan!!!")
        })
        // let karyawan = []
        // let tmp = []
        // karyawan.aggregate([
        //     {
        //         $sort:{create:-1}
        //     }
        // ]).then((response)=>{
        //     Axios({
        //         method: "get",
        //         url: "https://backoffice.bapguard.com/api/mengunjungi",
        //         headers: {'Content-Type' : 'application/json'}

        //     }).then((alta)=>{
        //         alta.data.data.map((val)=>{
        //             karyawan.push(val)
        //         })
        //         response.map((val)=>{
        //             karyawan.map((value)=>{
        //                 if(value.nopeg==val.idcorp){
        //                     tmp.push({
        //                         ...val,
        //                         namaKaryawan : value.nama_karyawan
        //                     })
        //                 }
        //             })
        //         })
        //         res.status(200).json({
        //             jmlData : tmp.length,
        //             data : tmp
        //         })
        //     })
        // }).catch((error)=>{
        //     res.status(400).json({
        //         message: "Gagal memuat database"
        //     })
        //     console.log(error)
        //     console.log("findAllForm!!!")
        // })
          
    }

    static editKaryawan (req, res){
        let data = req.body

        karyawan.findOneAndUpdate({
            _id : data._id
        },{
            nama : data.nama,
            tlpn : data.tlpn,
            nik  : data.nik,
            noUser : data.noUser,
            inf  : data.inf,
            status :data.status,
            editBy :data.editBy

        }).then((r)=>{
            res.status(200).json({
                message: "Berhasil Edit Data"
            })
        }).catch((error)=>{
            res.status(400).json({
                message:"Gagal Edit data"
            })
            console.log(error)
            console.log("editDataKaryawan!!!")
        })

    }

    static deleteKaryawan(req,res){
        let data=req.body

        karyawan.findOneAndDelete({
            noUser : data.noUser
        }).then((r)=>{
            res.status(200).json({
                message: "Berhasil menghapus data karyawan!"
            })
        }).catch((error)=>{
            res.status(400).json({
                message:"Gagal menghapus data karyawan!"
            })
            console.log(error)
            console.log("deleteDataKaryawan!!!")
        })

    }

}

module.exports = KaryawanController;