const mongoose = require("mongoose");

const PembeliSchema = new mongoose.Schema({

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

const pembeli = mongoose.model("pembeli", PembeliSchema);

module.exports = pembeli;