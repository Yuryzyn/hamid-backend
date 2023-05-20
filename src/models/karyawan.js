const mongoose = require("mongoose");

const KaryawanSchema = new mongoose.Schema({

    nama : {
        type : String,
        required : true,

    },
    tlpn : {
        type : String,
        required : true,

    },
    nik : {
        type : String,
        required : true,

    },
    alamat : {
        type : String,
        required : true,

    },
    status : {
        type : String,
        default : "Aktif",

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

const karyawan = mongoose.model("karyawan", KaryawanSchema);

module.exports = karyawan;