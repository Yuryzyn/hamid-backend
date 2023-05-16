const mongoose = require("mongoose");

const barangSchema = new mongoose.Schema({

    namaBarang : {
        type : String,
        required : true,

    },
    tipeBarang : {
        type : String,
        required : true,

    },
    hargaBeli : {
        type : Number,
        required : true,

    },
    hargaJual : {
        type : Number,
        required : true,

    },
    fotoBarang : {
        type : String,
        default : "Tidak Ada Foto!",

    },

},{
    versionKey : false,
    timestamps : {
        createdAt : "create",
        updatedAt : "update"
    }
});

const barang = mongoose.model("barang", barangSchema);

module.exports = barang;