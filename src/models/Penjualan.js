const mongoose = require("mongoose");

const PenjualanSchema = new mongoose.Schema({

    noPenjualan : {
        type : String,
        required : true,

    },
    noUser : {
        type : String,
        required : true,

    },
    namaPembeli : {
        type : String,
        required : true,

    },
    namaBarang : {
        type : String,
        required : true,

    },
    jumlahBarang : {
        type : Int16Array,
        required : true,
        default : 0,

    },
    hargaTotal : {
        type : Int16Array,
        require : true,
        default : 0,

    },
    alamatKirim : {
        type : String,
        require : true,

    },
    tglpesan : {
        type : String,
        require : true,

    },
    tglKirim : {
        type : Date,
        require : true,

    },
    editBy : {
        type : String,
        default : "",

    }
    
},{
    versionKey : false,
    timestamps : {
        createdAt : "create",
        updatedAt : "update"
    }
});

const penjualan = mongoose.model("penjualan", PenjualanSchema);

module.exports = penjualan;