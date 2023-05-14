const mongoose = require("mongoose");

const barangRusakSchema = new mongoose.Schema({

    idBarang : {
        type : String,
        required : true,

    },
    fotoBarang : {
        type : String,
        required : true,

    }, 
    idRusak : {
        type : String,
        required : true,

    }, 
    jumlahRusak : {
        type : String,
        required : true,

    }, 
    keterangan : {
        type : String,
        required : true,

    },
    status : {
        type : String,
        required : true,

    },
    
});

const barangRusak = mongoose.model("barangRusak", barangRusakSchema);

module.exports = barangRusak;