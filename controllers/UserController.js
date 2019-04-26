const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const User = require('../models/User');
const Comment = require('../models/Comment');
let bcrypt = require('bcryptjs');
let salt = bcrypt.genSaltSync(10);

let register = (req,res)=>{
    var body = req.body;

    User.find({ email : body.email }).exec().then(
        user=>{
            if(user.length >= 1){
                res.status(409).send('email already exists');
            } else{
                let user = new User({
                    email : body.email,
                    password : bcrypt.hashSync(body.password,salt),
                    name : body.name,
                    lastname: body.lastname 
                });
                user.save().then(result=>{
                    result.password = ":)";
                    res.status(200).send(result);
                })
                .catch(err=>{
                    console.log(err);
                    res.status(500).send("User could not be created");
                });
            }
        });    
}

let verifyEmail = (req,res) =>{
    let email = req.body.email;

    User.find({email:email},(err,users)=>{
        if(err){
            res.status(500).send("Internal server error");
        }else{
            res.status(200).send(users);
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
            if(bcrypt.compareSync(body.password, user[0].password)){
            //if(user[0].password != body.password){
                //res.status(401).send("auth failed");
                user[0].password = ':)';
                res.status(200).send(user[0]);
            }else{
                //user[0].password = ':)';                
                res.status(401).send("auth failed");//res.status(200).send(user[0]);
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
            if(!bcrypt.compareSync(oldPassword, user.password)){
            //if(oldPassword != user.password){               
                res.status(400).send('Wrong password');
            }else{
                user.password = bcrypt.hashSync(newPassword,salt);
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
    let email = req.body.email;

    User.findById(email,(err,user)=>{
        if(err){
            res.status(500).send('Internal server error');
        }
        if(!user){
            res.status(404).send('User not found');
        }
        else{
            let object = {
                email : user.email,
                name : user.name,
                lastname : user.lastname
            };
            user.password = ":)";
            res.status(200).send(object);
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

module.exports = {register,login,getUserData,getMoviesCommented,changePassword,verifyEmail}