const mongoose = require("mongoose");

const barangRusakSchema = new mongoose.Schema({

    idBarang : {
        type : String,
        required : true,

    },  
    keterangan : {
        type : String,
        required : true,

    },
    buktiFoto : {
        type : String,
        default : "Tidak ada bukti foto!",

    },
    jumlah : {
        type : Number,
        required : true,
    },
    status : {
        type : Boolean,
        default : false,

    },
    
},{
    versionKey : false,
    timestamps : {
        createdAt : "create",
        updatedAt : "update"
    }
});

const barangRusak = mongoose.model("retur", barangRusakSchema);

module.exports = barangRusak;