const { response, request } = require("express")
const Axios = require("axios");
const mongoose = require("mongoose");
const { generateTokenWOExp, generateTokenWithExp } = require("../helpers/token");
const { checkPass } = require("../helpers/hash");
const { hashPass } = require("../helpers/hash");
const ObjectId = mongoose.Types.ObjectId;
const Login = require("./../models/login");
const login = require("./../models/login");
// const { isObjectIdOrHexString } = require("mongoose");
// const bcrypt = require("bcryptjs");


class Controller{
    
    static register(req, res, next){
        let {idKaryawan,username,password,role} = req.body

        Login.create({
            idKaryawan,
            password,
            username,
            role,

        }).then((response) => {
        res.status(200).json({ message: "Username berhasil didaftarkan" });
      }).catch(next);
    }

    static LoginKaryawan(req, res, next){
        
        let {username,password} = req.body
        
        login.findOne({ username })
            .then(async (response) => {
                if (!response) {
                    throw { status: 400, message: "Maaf akun anda tidak terdaftar!" };
                } else {
                    if (response && checkPass(password, response.password)) {
                    try {
                        let token = {
                            username: response.username,
                            role: response.role,
                        };
                        let tokenHashed = await generateTokenWithExp(token);
                        res.status(200).json({
                            username: response.username,
                            role: response.role,
                            token: tokenHashed,
                        });
                        } catch (err) {
                            console.log(err);
                        }
                    } else {
                        throw { status: 400, message: "Email atau Password anda salah!" };
                    }
                }

      })
      .catch(next);
    }

    static findAkun(req, res, next){
        let { idKaryawan } = req.body;

        login.findOne({
            idKaryawan
        }).then((response) => {
            res.status(200).json({ data: response });
        }).catch(next);

    }

    static resetUsernamePassword(req,res,next){

        let {idKaryawan,username,password} = req.body
        let newPass = hashPass(password);

        login.findOneAndUpdate({
            idKaryawan
        },{
            username,
            password: newPass,

        }).then((response) => {
            res.status(200).json({ message: "Password berhasil diubah" });
        }).catch(next);

    }

    static refreshLogin(req, res, next) {
        login.findOne({ username: req.decoded.username })
          .then(async (response) => {
            if (response) {
              try {
                let token = {
                  username: response.username,
                  role: response.role,
                };
                let tokenHashed = await generateTokenWithExp(token);
                res.status(200).json({
                  nama: response.nama,
                  role: response.role,
                  token: tokenHashed,
                });
              } catch (err) {
                console.log(err);
              }
            } else {
              throw { status: 403, message: "Token bermasalah" };
            }
          })
          .catch(next);
      }

    static deleteAkun(req, res, next) {
        let { _id, role } = req.body;
        
        if (role == "") {
            throw {
              message: "Role ini tidak dapat di hapus!",
            };
        } else {
            UserWarmindo.findOne({ _id })
                .then((response) => {
                    return UserWarmindo.deleteOne({ _id: ObjectId(_id) });
                })
                .then((response) => {
                    res.status(200).json({
                    status: 200,
                    message: "Akun berhasil di hapus!",
                });
              })
              .catch(next);
        }
    }
}

module.exports = Controller;