const mongoose = require("mongoose");
const jual = require("../models/Penjualan");
const ObjectId = mongoose.Types.ObjectId;
const Axios = require("axios");
const { response } = require("express");
const gudang = require("../models/gudang");
const barang = require("../models/barang");
const pembeli = require("../models/pembeli");
const akun = require("../models/akun");

class PenjualanController {

    static addPenjualan(req, res, next){
        let data = req.body

        jual.create({
            noNota : data.noNota,
            idKaryawan : data.idKaryawan,
            idPembeli : data.idPembeli,
            idBarang : data.idBarang,
            jumlahBeli : data.jumlahBeli,
            alamatKirim : data.alamatKirim,
            hargaTotal : data.hargaTotal,
            tglKirim : data.tglKirim,
        }).then((response)=>{
            if(response.hargaTotal === 0){
                let calculateTotal = response.map((newData)=>{
                    return barang.findById({
                        _id : newData.idBarang
                    }).then((barang)=>{
                        const totalHarga = barang.hargaJual * newData.jumlahBeli;
                        return jual.updateOne({noNota : newData.noNota},{hargaTotal : totalHarga})
                    })
                })
                return Promise.all(calculateTotal);
            }
        }).then((r)=>{
            res.status(200).json({
                message: "Berhasil mengirim data pembeli"
            })
        }).catch(next)
    }

    static allPenjualan(req, res, next){
        
        stock.find({
        }).then((response)=>{
            let final = response.map((data)=>{
                return barang.findById({_id : data.idBarang}).then((resBarang)=>{
                    const barangFinal = {_id : resBarang._id, jenis : resBarang.jenis, merk : resBarang.merk, harga : resBarang.hargaJual}
                    return pembeli.findById({_id : data.idPembeli}).then((resPembeli)=>{
                        const pembeliFinal = {_id : resPembeli._id, nama : resPembeli.nama, tlpn : resPembeli.tlpn}
                        return akun.findById({_id : data.idKaryawan}).then((resKaryawan)=>{
                            const karyawanFinal = {_id : resKaryawan._id, nama : resKaryawan.nama, tlpn : resKaryawan.tlpn}
                            return {
                                _id : data._id,
                                noNota : data.noNota,
                                karyawan : karyawanFinal,
                                pembeli : pembeliFinal,
                                barang : barangFinal,
                                nomorSuratJalan : data.nomorSuratJalan,
                                jumlahBeli : data.jumlahBeli,
                                alamatKirim : data.alamatKirim,
                                hargaTotal : data.hargaTotal,
                                tglKirim : data.tglKirim,
                                statusKirim : data.statusKirim,
                                handleBy : data.handleBy,
                            }
                        })
                    })  
                })
            })
            return Promise.all(final);
        }).then((finalData)=>{
            res.status(200).json({
                data : finalData,
                message: "Berhasil memuat semua data penjualan"
            })
        })
    }

    static checkPengiriman(req, res, next){
        let data = req.body

        jual.findByIdAndUpdate({
            _id : data._id
        },{
            nomorSuratJalan : data.nomorSuratJalan
        }).then((response)=>{
            if(response.nomorSuratJalan === "belum ada surat jalan"){
                throw{
                    status : 403,
                    message : "Nomor surat jalan harus di isi!"
                }
            } else {
                jual.updateOne({
                    _id : data._id
                },{statusKirim : "deliver"})
            }
        }).then((r)=>{
            res.satus(200).json({
                message : "Berhasil checkmark barang yang masuk!"
            })
        }).catch(next)

    }

    static checkCancelPenjualan(req, res, next) {
        let data = req.body

        jual.findById({
            _id : data._id
        }).then((response)=>{
            if(response.statusKirim === "deliver" ) {
                throw{
                    status : 403,
                    message : "Pesanan ini sudah dalam proses pengiriman!"
                }
            } else if (response.statusKirim === "finished" ) {
                throw {
                    status : 403,
                    message : "Pesanan ini sudah di kirim dan sudah selesai!"
                }
            } else {
                jual.updateOne({
                    _id : data._id
                },{statusKirim : "canceled"})
            }
        }).then((r)=>{
            res.satus(200).json({
                message : "Berhasil checkmark barang yang masuk!"
            })
        }).catch(next)

    }

    static checkSelesaiPenjualan(req, res, next) {
        let data = req.body

        jual.findById({
            _id : data._id
        }).then((response)=>{
            if(response.statusKirim === "on-process" ) {
                throw{
                    status : 403,
                    message : "Pesanan ini masih di proses!"
                }
            } else if (response.statusKirim === "cancel" ) {
                throw {
                    status : 403,
                    message : "Pesanan ini telah di cancel!"
                }
            } else {
                jual.updateOne({
                    _id : data._id
                },{statusKirim : "finished"})
            }
        }).then((response2)=>{
            let reduceStock = response2.map((newData)=>{
                return gudang.updateOne({idBarang : newData.idBarang},{
                    $inc:{jumlahBarang: -newData.jumlahBeli}
                })
            })
            return Promise.all(reduceStock);
        }).then((r)=>{
            res.satus(200).json({
                message : "Berhasil checkmark barang yang masuk!"
            })
        }).catch(next)

    }

}

module.exports = PenjualanController;