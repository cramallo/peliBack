const bodyParser = require('body-parser');
const Movie = require('../models/Movie');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

let getMovies = (req, res) =>
{          
    //Listar resultados
    Movie.find()
    .then
    (
        (moviesList)=>
        {
            res.send(moviesList); //devuelvo resultado query              
        },
        (err)=>{console.log(err);}
    )   
}    

let createMovie = (req,res) =>
{   
    let body = req.body;
   // console.log(req.body);
    var newMovie = Movie({
        name : body.name,
        description : body.description,
        releaseYear : body.releaseYear,
        img : body.img,
        director : body.director,    
        actors : body.actors,    
        generalScore: body.generalScore        
    });
    newMovie.save().
    then
    (
        (newMovie)=>
        {                           
            res.send(newMovie)
        },
        (err)=>{console.log(err);}
    ) 
}

module.exports = {getMovies, createMovie};