const mongoose = require("mongoose");

const LoginSchema = new mongoose.Schema({

    username : {
        type : String,
        required : true,

    },
    password : {
        type : String,
        required : true,

    },
    idKaryawan : {
        type : String,
        required : true,

    }

},{
    versionKey : false,
});

const login = mongoose.model("login", LoginSchema);

module.exports = login;