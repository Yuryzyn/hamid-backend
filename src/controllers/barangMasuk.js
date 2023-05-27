const mongoose = require("mongoose");
const masuk = require("./../models/barangMasuk");
const ObjectId = mongoose.Types.ObjectId;
const Axios = require("axios");
const { response } = require("express");
const gudang = require("../models/gudang");
const barang = require("../models/barang");

class barangMasukController {

    static addBarangMasuk(req, res, next){
        let {idBarang, keterangan, jumlahMasuk, tanggalTerima, nomorSuratJalan, totalHargaBeli} = req.body

        barang.findOne({
            _id : idBarang
        }).then((response1)=>{
            if (response1 === 0){
                throw {
                    satus : 400,
                    Message : "Tidak ada data, tambahkan jenis barang baru!",
                }
            } else {
                masuk.create({
                    idBarang,
                    keterangan,
                    jumlahMasuk,
                    totalHargaBeli,
                    tanggalTerima,
                    nomorSuratJalan,
                })
            }
        }).then((response)=>{
            if(response.hargaBeli === 0){
                let calculateTotal = response.map((newData)=>{
                    return barang.findById({
                        _id : newData.idBarang
                    }).then((barang)=>{
                        const totalHarga = barang.hargaBeli * newData.jumlahMasuk;
                        return masuk.updateOne({_id : newData._id},{hargaTotal : totalHarga})
                    })
                })
                return Promise.all(calculateTotal);
            }
        }).then((r)=>{
            res.status(200).json({
                Message : "Berhasil menambah data barang masuk!"
            })
        }).catch(next)
        
    }

    static editDataBarangMasuk(req, res, next){
        let {_id, idBarang, keterangan, jumlahMasuk, tanggalTerima, nomorSuratJalan } = req.body

        masuk.findByIdAndUpdate({
            _id : _id
        },{
            idBarang, 
            keterangan, 
            jumlahMasuk, 
            tanggalTerima, 
            nomorSuratJalan,
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