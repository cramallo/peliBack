const bodyParser = require('body-parser');
const Show = require('../models/Show');
const Comment = require('../models/Comment');

//MOVIES

let findMovies = (req,res)=>{
    let title = req.params.title;
    let regex = new RegExp(title,'i');

    Show.find({ Title: regex, Type:'movie' },(err,movies)=>{
        if(err){
            res.status(500).send('Server Error');
        }
        res.send(movies);           
    });
}

let getMovies = (req, res) =>
{   Show.find({Type:'movie'})
    .then
    (
        (moviesList)=>
        {
            res.send(moviesList);              
        },
        (err)=>{console.log(err);}
    );   
}


//TODO: SACAR ESTO
let createMovie = (req,res) =>
{   
    let body = req.body;
   
    let newMovie = Show({    
        Title: body.title,
        Genre: body.genre,
        Type: body.type, // movie o series
        Poster: body.poster,
        Score: body.score, //poner en 0
        Year: body.year,   
        Director: body.director,
        Runtime: body.runtime,
        Plot: body.plot,   
        Actors: body.actors,
        NumberOfScores: 0
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


//SERIES

let findSeries = (req,res)=>{
    let title = req.params.title;
    let regex = new RegExp(title,'i');

    Show.find({ Title: regex, Type:'series' },(err,movies)=>{
        if(err){
            res.status(500).send('Server Error');
        }else{        
            res.send(movies);   
        }     
    });
}


// TODO: SACAR ESTO
let createSerie = (req,res)=>{
    let body = req.body;

    let newSerie = Show({
        Title: body.title,
        Genre: body.genre,
        Type: body.type, // movie o series
        Poster: body.poster,
        Score: body.score,
        Year: body.year,   
        Director: body.director,
        Runtime: body.runtime,
        Plot: body.plot,   
        Actors: body.actors,
        NumberOfScores: 0
    });

    newSerie.save().then((serie)=>{
        res.status(200).send(serie);
    },
    (err)=>{
        res.status(400).send("Error");
    }

    ).catch(err=>{
        res.status(500).send("Internal server error");
    });    
}

let createShow = (req,res)=>{

    let body = req.body;

    let newShow = Show({
        Title: body.title,
        Genre: body.genre,
        Type: body.type, // movie o series
        Poster: body.poster,
        Score: 0,
        Year: body.year,   
        Director: body.director,
        Runtime: body.runtime,
        Plot: body.plot,   
        Actors: body.actors,
        NumberOfScores: 0,
        imbdID: body.imbdID
    });

    newShow.save().then(show=>{
        res.status(200).send(show);
    }).catch(err=>{
        res.status(500).send("Internal server error");
    });     
}


//TODO: HACER QUE TRAIGA PAGINA DE LAS PELICULAS DEL ULTIMO AÑO
let getSeries = (req, res) =>
{   
    console.log(String(new Date().getFullYear()));
    Show.find({ Type: 'series'})
    .then
    (
        (series)=>
        {
            res.status(200).send(series);              
        },
        (err)=>{
            res.status(400).send("Error");
        }
    ).catch(err=>{
        res.status(500).send("Error");
    });   
}


//COMMENTS

let createComment = (req,res)=>{
    let showid = req.params.showid;   
    let body = req.body;      

    Comment.find({user:body.userid,imbdID:showid},(err,comments)=>{        
        if(err){      
            console.log("chau");      
            console.log(err);

            res.status(500).send("Internal server error");
        }else{
            //If the user didn't comment the movie
            if(comments.length<1){
                //antes usaba finbyid y pasaba _id
                Show.findOne({imbdID:showid}).then(show=>{
                    console.log("hola");
                    //Create the comment
                    let newComment = Comment({
                        user: body.userid,
                        imbdID: showid,
                        show: show._id,
                        score: body.score,
                        comment: body.comment,
                        date: new Date()
                    });
            
                    newComment.save().then(comment=>{            
            
                        //Update the general score of the show
                        show.NumberOfScores+=1;
                        show.Score = (show.Score + body.score) / show.NumberOfScores;
                        
                        show.save((err,updatedshow)=>{
                            if(err){                               
                                res.status(500).send('Internal server error');
                            }else{
                                res.status(200).send(comment);
                            }
                        });           
                    }
                    ).catch(err=>{
                        console.log(err);
                        res.status(500).send("Internal server error");
                    });
            
                }).catch(
                    err=>{
                        res.status(500).send('Internal server error');
                    }
                );            
            }else{
                res.status(409).send("The user have already commented the movie");
            }
        }
    });    
}

let getComments = (req,res)=>{
    console.log("habia una");

    var id = req.params.showid;      
    console.log("habia una vez");
    
    Comment.find({ imbdID: id }).populate('user','_id, name, lastname, email').exec((err,shows)=>{        
        if(err){             
            console.log(error);
            res.status(500).send('Server error');
        }
       res.send(shows);
    });
}

module.exports = {createShow, getMovies, findMovies, getSeries, findSeries, createComment, getComments};