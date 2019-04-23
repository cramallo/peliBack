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
                bcrypt.hash(body.password, 6, (err, hash) =>{
                    if (err) {
                        return res.status(500).send('register failed');
                      } else {
                        let user = new User({
                            email : body.email,
                            password : hash,
                            name : body.name,
                            lastname: body.lastname 
                        });
        
                        user.save().then(result=>{
                            res.status(200).send(result);
                        })
                        .catch(err=>{
                            res.status(500).send("User could not be created");
                        });
                      }
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
            bcrypt.compare(body.password, user[0].password, (err, result)=>{
                
                if(err){
                    res.status(401).send("auth failed 2");
                }                
                if(result){                    
                    res.status(200).send("auth successful");
                }else{
                    console.log(result);
                    res.status(400).send("auth failed 3");
                }

            });
        }
    );
}

module.exports = { register,login }