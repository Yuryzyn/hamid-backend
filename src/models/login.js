const mongoose = require("mongoose");
const { hashPass } = require("./../helpers/hash");

const LoginSchema = new mongoose.Schema({

    username : {
        type : String,
        require : [true, "Username harus di isi!"],

    },
    password : {
        type : String,
        require : [true,"password harus di isi!"],

    },
    idKaryawan : {
        type : String,
        require : [true,"id harus di isi!"],

    },
    role : {
        type : Number,
        require : [true,"Role harus di isi!"],
    },
    status : {
        type : String,
        default : "aktif",

    },
    
},{
    versionKey : false,
});

LoginSchema.pre("save", function (next) {
    let newPass = hashPass(this.password);
    this.password = newPass;
    next();
  });

const login = mongoose.model("login", LoginSchema);

module.exports = login;