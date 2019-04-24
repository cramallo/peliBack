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
                let user = new User({
                    email : body.email,
                    password : body.password,
                    name : body.name,
                    lastname: body.lastname 
                });
                user.save().then(result=>{
                    res.status(200).send(result);
                })
                .catch(err=>{
                    console.log(err);
                    res.status(500).send("User could not be created");
                });
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
            if(user[0].password != body.password){
                res.status(401).send("auth failed 2");
            }else{
                res.status(200).send("auth successful");
            }            
        }
    );
}

module.exports = { register,login }