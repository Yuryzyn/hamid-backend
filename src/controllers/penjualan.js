const mongoose = require("mongoose");
const jual = require("../models/penjualan.js");
const ObjectId = mongoose.Types.ObjectId;
const Axios = require("axios");
const { response } = require("express");
const gudang = require("../models/gudang");
const barang = require("../models/barang");
const pembeli = require("../models/pembeli");
const akun = require("../models/akun");

class PenjualanController {

    static addPenjualan(req, res, next) {
        const data = req.body;
    
        jual.create({
          noNota: data.noNota,
          idKaryawan: data.idKaryawan,
          idPembeli: data.idPembeli,
          alamatKirim: data.alamatKirim,
          tglKirim: data.tglKirim,
          penjualanItems: [], // Inisialisasi array penjualanItems
          hargaTotal: 0, // Inisialisasi hargaTotal
        })
          .then((response) => {
            const penjualanItems = data.penjualanItems;
    
            // Simpan tipe barang dan jumlah beli untuk setiap item penjualan
            const promises = penjualanItems.map((item) => {
              const idBarang = item.idBarang;
              const jumlahBeli = item.jumlahBeli;
    
              // Cari harga tipe barang
              return barang.findById({ _id: idBarang }).then((tool) => {
                const harga = tool.hargaJual;
    
                // Hitung harga total
                const totalHargaItem = harga * jumlahBeli;
    
                // Push data item penjualan ke array penjualanItems di model
                return jual
                  .findByIdAndUpdate(
                    { _id: response._id },
                    {
                      $push: {
                        penjualanItems: {
                          idBarang: idBarang,
                          jumlahBeli: jumlahBeli,
                          hargaPerItem: harga,
                          totalHargaItem: totalHargaItem,
                        },
                      },
                      $inc: {
                        hargaTotal: totalHargaItem,
                      },
                    },
                    { new: true } // Mengambil data yang telah diupdate
                  );
              });
            });
    
            return Promise.all(promises);
          })
          .then((r) => {
            res.status(200).json({
              message: "Berhasil mengirim data penjualan",
            });
          })
          .catch(next);
    }

    static allPenjualan(req, res, next) {
        jual
          .find({})
          .then((response) => {
            const promises = response.map((data) => {
              const penjualanItems = data.penjualanItems;
    
              // Mengambil data tipe barang dan pembeli untuk setiap item penjualan
              const barangPromises = penjualanItems.map((item) => {
                return barang
                  .findById({ _id: item.idBarang })
                  .then((resBarang) => ({
                    _id: resBarang._id,
                    jenis: resBarang.jenis,
                    merk: resBarang.merk,
                    harga: resBarang.hargaJual,
                  }));
              });
    
              const pembeliPromise = pembeli.findById({ _id: data.idPembeli });
    
              const karyawanPromise = akun.findById({ _id: data.idKaryawan });
    
              return Promise.all([Promise.all(barangPromises), pembeliPromise, karyawanPromise]).then(
                ([barangFinal, pembeliFinal, karyawanFinal]) => {
                  return {
                    _id: data._id,
                    noNota: data.noNota,
                    karyawan: karyawanFinal,
                    pembeli: pembeliFinal,
                    penjualanItems: penjualanItems.map((item, index) => ({
                      idBarang: item.idBarang,
                      jumlahBeli: item.jumlahBeli,
                      hargaPerItem: item.hargaPerItem,
                      totalHargaItem: item.totalHargaItem,
                      barang: barangFinal[index],
                    })),
                    nomorSuratJalan: data.nomorSuratJalan,
                    alamatKirim: data.alamatKirim,
                    hargaTotal: data.hargaTotal,
                    statusKirim: data.statusKirim,
                  };
                }
              );
            });
    
            return Promise.all(promises);
          })
          .then((finalResult) => {
            res.status(200).json({
              data: finalResult,
              message: "Berhasil memuat semua data penjualan",
            });
          })
          .catch(next);
      }

    static checkPengiriman(req, res, next){
        let data = req.body

        jual.findByIdAndUpdate({
            _id : data._id
        },{
            nomorSuratJalan : data.nomorSuratJalan
        }).then((response)=>{
            if(!data.nomorSuratJalan) {
                throw{
                    status : 403,
                    message : "Nomor surat jalan harus di isi!"
                }
            } else if(response.statusKirim === "canceled") {
                throw{
                    status : 403,
                    message : "Pesanan ini sudah di cancel!"
                }
            } else if(response.statusKirim === "finished") {
                throw{
                    status : 403,
                    message : "Pesanan ini sudah selesai!"
                }
            } else if(response.statusKirim === "deliver") {
                throw{
                    status : 403,
                    message : "Pesanan ini sudah dalam pengiriman!"
                }
            } else if(!response.statusKirim) {
                throw{
                    status : 400,
                    message : "Error, data tidak ditemukan!"
                }
            } else {
                return jual.findByIdAndUpdate({
                    _id : response._id
                },{
                    tglKirim : Date.now(),
                    statusKirim : "deliver"
                })
            }
        }).then((r)=>{
            res.status(200).json({
                message: "Berhasil mengupdate status penjualan dengan nomor surat jalan : " + data.nomorSuratJalan
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
            } else if (response.statusKirim === "canceled" ) {
                throw {
                    status : 403,
                    message : "Pesanan ini sudah di cancel!"
                }
            } else if(!response.statusKirim) {
                throw{
                    status : 400,
                    message : "Error, data tidak ditemukan!"
                }
            } else {
                return jual.findByIdAndUpdate({
                    _id : data._id
                },{statusKirim : "canceled"})
            }
        }).then((r)=>{
            res.status(200).json({
                message : "Berhasil cancel pesanan ini!"
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
            } else if(response.statusKirim === "cancel" ) {
                throw {
                    status : 403,
                    message : "Pesanan ini telah di cancel!"
                }
            } else if(response.statusKirim === "finished") {
                throw{
                    status : 403,
                    message : "Pesanan ini sudah selesai!"
                }
            } else if(!response.statusKirim) {
                throw{
                    status : 400,
                    message : "Error, data tidak ditemukan!"
                }
            } else {
                return jual.findByIdAndUpdate({
                    _id : data._id
                },{tanggalTerima : Date.now(), statusKirim : "finished"})
            }
        }).then((response2)=>{
            const barangId = response2.idBarang
            const totalTerjual = response2.jumlahBeli
            console.log(response2)
            if(!response2){
                throw{
                    status : 400,
                    message : "error, data tidak ada!"
                }
            } else {
                return gudang.updateOne({ 
                    idBarang : barangId
                },{
                    $inc : {
                        jumlahBarang : - totalTerjual
                    }
                })
            }
        }).then((r)=>{
            res.status(200).json({
                message : "Berhasil checkmark barang yang di kirim!"
            })
        }).catch(next)

    }

}

module.exports = PenjualanController;