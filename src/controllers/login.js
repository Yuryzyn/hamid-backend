const { response, request } = require("express")
const e = require("express")
const { isObjectIdOrHexString } = require("mongoose");
const bcrypt = require("bcryptjs");
const Login = require("./../models/login");
//const bcrypt = require("mongoose-Bcrypt");
const saltRounds = 10

class Controller{
    
    static register(req, res){
 
        let {idPegawai,username,password} = req.body

        bcrypt.genSalt(saltRounds, function (saltErr, salt){
            if(saltErr){
                throw saltErr
            } else {
                bcrypt.hash(password, salt, function(hashErr, hash){
                    if (hashErr){
                        throw hashErr
                    } else {
                        console.log(hash)
                        Login.create({
                            idPegawai,
                            username,
                            password : hash
                        }).then((response)=>{
                            res.status(200).json({
                                message: "Berhasil masuk, selamat datang " + username +" !!"
                            })
                            console.log("signIn>>>")
                        })
                        .catch((response)=>{
                            res.status(400).json({
                                message:"Gagal membuat akun baru"
                            })
                            console.log("signIn!!!")
                        })
                        
                    }
                })
            }
        })
        
    }

    static usrLogin(req,res){
        
        let {username,password} = req.body
        
        Login.findOne({
            username
        }).then((response)=>{
            console.log("hash     : "+ response.password)
            let check = bcrypt.compareSync(password, response.password) 
            console.log("status   : "+ check)
            if(check){
                res.status(200).json({
                    message:"Berhasil Masuk"
                })
            }else{
                res.status(400).json({
                    message:"Password Salah!"
                })
            }

        }).catch((response)=>{
            console.log(response)
            res.status(400).json({
                message:"Gagal koneksi"
            })
        })

    }

    static resetUsernamePassword(req,res){

        let {idPegawai,username,password} = req.body

        bcrypt.genSalt(saltRounds, function (saltErr, salt){
            if(saltErr){
                throw saltErr
            } else {
                bcrypt.hash(password, salt, function(hashErr, hash){
                    if (hashErr){
                        throw hashErr
                    } else {
                        console.log(hash)
                        Login.findOneAndUpdate({
                            idPegawai
                        },{
                            username : username,
                            password : password,
                            
                        }).then((response)=>{
                            res.status(200).json({
                                message: "Berhasil mengupdate, selamat datang " + username +" !!"
                            })
                            console.log("resetUsrPswd>>>")
                        })
                        .catch((response)=>{
                            res.status(400).json({
                                message:"Gagal update akun"
                            })
                            console.log("resetUsrPswd")
                        })
                        
                    }
                })
            }
        })

    }
}

module.exports = Controller;