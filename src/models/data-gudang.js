const mongoose = require("mongoose");

const gudangSchema = new mongoose.Schema({

    idBarang : {
        type : String,
        required : true,

    },
    jumlahBarang : {
        type : String,
        required : true,

    },
    idRusak : {
        type : String,
        required : true,

    }
    
});

const gudang = mongoose.model("gudang", gudangSchema);

module.exports = gudang;