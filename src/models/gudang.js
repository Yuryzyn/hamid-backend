const mongoose = require("mongoose");

const gudangSchema = new mongoose.Schema({

    idBarang : {
        type : String,
        required : true,

    },
    jumlahBarang : {
        type : Number,
        default : 0,

    },
    idRusak : {
        type : String,
        required : true,

    },
    jumlahRusak : {
        type : Number,
        Default : 0,
    }
    
});

const gudang = mongoose.model("gudang", gudangSchema);

module.exports = gudang;