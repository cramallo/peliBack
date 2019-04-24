const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var User = require('../models/User');

let register = (req,res)=>{
    var body = req.body;

    User.find({ email : body.email }).exec().then(
        user=>{
            if(user.length >= 1){
                res.status(409).send('email already exists');
            } else{
               res.send('arranco');
            }
        });    
}

let login = (req,res)=>{
    let body = req.body;

    User.find({ email: body.email }).exec().then(
        user=>{
            if (user.length < 1){
                res.status(401).send("auth failed 1");
            }
           res.send(arranco);
        }
    );
}

module.exports = { register,login }