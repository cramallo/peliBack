const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const User = require('../models/User');
const Comment = require('../models/Comment');

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
                res.status(401).send("auth failed");
            }
            if(user[0].password != body.password){
                res.status(401).send("auth failed");
            }else{
                user[0].password = ':)';
                res.status(200).send(user[0]);
            }            
        }
    ).catch(err=>{
        res.send('auth failed');
    });
}

let changePassword = (req,res)=>{
    let body = req.body;
    let oldPassword = body.oldpassword;
    let newPassword = body.newpassword;
    let userid = body.userid;

    User.findById(userid,(err,user)=>{
        if(err){
            res.status(500).send('Internal server error');
        }
        if(!user){
            res.status(404).send('User not found');
        }
        else{
            if(oldPassword != user.password){
                console.log(oldPassword);
                console.log(user.password);
                res.status(400).send('Wrong password');
            }else{
                user.password = newPassword;
                user.save((error,modifieduser)=>{
                    if(error){
                        res.status(500).send('Internal server error');
                    }
                    if(!modifieduser){
                        res.status(400).send('User could not be created');
                    }
                    else{
                        modifieduser.password = ":)"
                        res.status(200).send(modifieduser);
                    }
                });                
            }
        }
    });    
}

let getUserData = (req,res) =>{
    let userid = req.body.userid;

    User.findById(userid,(err,user)=>{
        if(err){
            res.status(500).send('Internal server error');
        }
        if(!user){
            res.status(404).send('User not found');
        }
        else{
            user.password = ":)";
            res.status(200).send(user);
        }
    });
}

//Get the movies commented by the user logued
let getMoviesCommented = (req,res)=>{
    let userid = req.body.userid;

    Comment.find({user:userid}).populate('show').exec(
        (err,comments)=>{
            if(err){
                res.send('Internal server error');
            }
            res.send(comments);
        }
    );
}

module.exports = {register,login,getUserData,getMoviesCommented,changePassword}