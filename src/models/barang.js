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
        type : String,
        required : true,

    },
    HargaJual : {
        type : String,
        required : true,

    },
    idBarang : {
        type : String,
        required : true,

    },
    fotoBarang : {
        type : String,
        required : true,

    }
    
});

const barang = mongoose.model("barang", barangSchema);

module.exports = barang;