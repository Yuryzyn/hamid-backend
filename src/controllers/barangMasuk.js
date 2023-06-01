const mongoose = require("mongoose");
const masuk = require("./../models/barangMasuk");
const ObjectId = mongoose.Types.ObjectId;
const Axios = require("axios");
const { response } = require("express");
const gudang = require("../models/gudang");
const barang = require("../models/barang");

class barangMasukController {

    static addBarangMasuk(req, res, next){
        let data = req.body

        gudang.find({
            idBarang : data.idBarang
        }).then((response1)=>{
            if (response1 === 0){
                return gudang.create({
                    idBarang: data.idBarang,
                    jumlahBarang : 0,
                    jumlahRusak : 0,
                    handleBy : data.handleBy,
                }).then((reNew)=>{
                    return masuk.create({
                        idBarang : data.idBarang,
                        keterangan : data.keterangan,
                        jumlahMasuk : data.jumlahMasuk,
                        totalHargaBeli : data.totalHargaBeli,
                        tanggalTerima : data.tanggalTerima,
                        nomorSuratJalan : data.nomorSuratJalan,
                        handleBy : data.handleBy,
                    })
                })
            } else {
                return masuk.create({
                    idBarang : data.idBarang,
                    keterangan : data.keterangan,
                    jumlahMasuk : data.jumlahMasuk,
                    totalHargaBeli : data.totalHargaBeli,
                    tanggalTerima : data.tanggalTerima,
                    nomorSuratJalan : data.nomorSuratJalan,
                    handleBy : data.handleBy,
                })
            }
        // }).then((response3)=>{
        //     const objekId = response3._id
        //     const Barangasuk = response3.jumlahMasuk
        //     const iditem = response3.idBarang
        //     if(response3.totalHargaBeli = 0){
        //         barang.findById({
        //             _id : response3.idBarang
        //         }).then((tool)=>{
        //             const totalHarga = tool.hargaBeli;
        //             console.log(tool)
        //             return masuk.findByIdAndUpdate({_id : objekId},{$inc : {totalHargaBeli : totalHarga * Barangasuk}})
        //         })
        //     }
        }).then((r)=>{
            res.status(200).json({
                Message : "Berhasil menambah data barang masuk!"
            })
        }).catch(next)
        
    }

    static editDataBarangMasuk(req, res, next){
        let {_id, idBarang, keterangan, jumlahMasuk, tanggalTerima, nomorSuratJalan,handleBy } = req.body

        masuk.findByIdAndUpdate({
            _id : _id
        },{
            idBarang, 
            keterangan, 
            jumlahMasuk, 
            tanggalTerima, 
            nomorSuratJalan,
            handleBy,
        }
        ).then((response)=>{
            res.status(200).json({
                Message : "Berhasil ubah data barang masuk!"
            })
        }).catch(next)

    }
    
    static daftarBarangMasuk(req, res, next){

        masuk.find ({}).then((response)=>{
            res.status(200).json({
                data : response,
                message : "Berhasil memuat database barang masuk!"
            })
        })
        .catch(next)
    }

    static checkMarkBarangBaru(req, res, next){
        let data = req.body

        masuk.findById({
            _id : data._id
        }).then((response)=>{
            if(response.nomorSuratJalan === "belum ada surat jalan"){
                throw{
                    status : 403,
                    message : "Nomor surat jalan harus di isi!"
                }
            } else {
                masuk.updateOne({
                    _id : data._id
                },{statusTerima : "sudah diterima"})
            }
        }).then((response2)=>{
            if(response2 != 0){
                gudang.findOneAndUpdate({
                    idBarang : response2.idBarang
                },{
                    $inc : {
                        jumlahBarang : +response2.jumlahBarang
                    }
                })
            }
        }).then((r)=>{
            res.satus(200).json({
                message : "Berhasil checkmark barang yang masuk!"
            })
        }).catch(next)

    }

}

module.exports = barangMasukController;