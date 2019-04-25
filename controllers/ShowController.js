const bodyParser = require('body-parser');
const Show = require('../models/Show');
const Comment = require('../models/Comment');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
  });

  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });
  


let findMovies = (req,res)=>{
    let title = req.params.title;
    let regex = new RegExp(title,'i');

    Show.find({ title: regex, type:'movie' },(err,movies)=>{
        if(err){
            res.status(500).send('Server Error');
        }
        if(res.length < 1){
            res.status(404).send('Not Found');
        }
        else{
            res.send(movies);
        }       
    });
}


let findSeries = (req,res)=>{
    let title = req.params.title;
    let regex = new RegExp(title,'i');

    Show.find({ title: regex, type:'serie' },(err,movies)=>{
        if(err){
            res.status(500).send('Server Error');
        }
        if(res.length < 1){
            res.status(404).send('Not Found');
        }
        else{
            res.send(movies);
        }       
    });
}

//TODO: HACER QUE TRAIGA PAGINA DE LAS PELICULAS DEL ULTIMO AÑO
let getMovies = (req, res) =>
{          
    //Listar resultados
    Show.find()
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
    let newMovie = Show({
        title: body.title,
        genre: body.genre,
        type: body.type,
        coverSource: body.coverSource,
        score: body.score,
        year: body.year,   
        director: body.director,
        duration: body.duration,
        description: body.description,   
        actors: body.actors      
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

//Comments

let createComment = (req,res)=>{
    let showid = req.params.showid;
    let body = req.body;

    let newComment = Comment({
        user: body.userid,
        show: showid,
        score: body.score,
        comment: body.comment,
        date: new Date()
    });

    newComment.save().then(comment=>{
        res.send(comment);
    }
    ).catch(err=>{
        console.log(err);
        res.status(500).send("server error");
    });
}

let getComments = (req,res)=>{
    var id = req.params.showid;   
    
    Comment.find({ show: id },(err,shows)=>{        
        if(err){
            console.log("error");   
            res.status(500).send('Server error');
        }
        if(shows.length < 1){
            console.log("no hay nada");            
            res.status(404).send('Not Found');
        }
        else{
            console.log("esta");
            res.send(shows);
        }
    });
}





module.exports = {getMovies, createMovie, findMovies, findSeries, createComment, getComments};