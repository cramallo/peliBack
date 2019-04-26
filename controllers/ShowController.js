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

    newSerie.save().then(serie=>{
        res.status(200).send(serie);
    }).catch(err=>{
        res.status(500).send("Internal server error");
    });    
}

//TODO: HACER QUE TRAIGA PAGINA DE LAS PELICULAS DEL ULTIMO AÑO
let getSeries = (req, res) =>
{   Show.find({ Type: 'series'})
    .then
    (
        (series)=>
        {
            res.send(series);              
        },
        (err)=>{console.log(err);}
    );   
}


//COMMENTS

let sacaraa = (req,res)=>{
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
        res.status(200).send(comment);

        //Update the general score of the show



    }
    ).catch(err=>{
        console.log(err);
        res.status(500).send("Internal server error");
    });
}

let createComment = (req,res)=>{
    let showid = req.params.showid;   
    let body = req.body;   

    Show.findById({_id:showid}).then(show=>{

        //Create the comment
        let newComment = Comment({
            user: body.userid,
            show: showid,
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
                    res.status(500).send('Internal server error 1');
                }else{
                    res.status(200).send(comment);
                }
            });           
        }
        ).catch(err=>{
            console.log(err);
            res.status(500).send("Internal server error 2");
        });

    }).catch(
       err=>{
           res.send(500).send('Internal server error 3');
       }
    );
}

let getComments = (req,res)=>{
    var id = req.params.showid;      
    
    Comment.find({ show: id },(err,shows)=>{        
        if(err){             
            res.status(500).send('Server error');
        }
        if(shows.length < 1){                       
            res.status(404).send('Not Found');
        }
        else{            
            res.send(shows);
        }
    });
}

module.exports = {getMovies, createMovie, findMovies, createSerie, getSeries, findSeries, createComment, getComments};