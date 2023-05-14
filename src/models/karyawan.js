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
    noUser : {
        type : String,
        required : true,

    },
    inf : {
        type : String,
        required : true,

    },
    status : {
        type : String,
        default : "aktif",

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