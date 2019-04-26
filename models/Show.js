var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var showSchema = new Schema({

    Title: { type:String,required:[true,"The title is required"] },
    Genre: { type:String,required:[true,"The genre is required"] },
    Type: { type:String,required:[true,"the type is required"] }, // movie o series
    Poster: { type:String,required:false,default:"" },
    Score: { type:Number,required:false,default:0 },
    NumberOfScores:{ type:Number},
    Year: { type:String,required:false,default:"" },   
    Director: { type:String,required:false,default:"" },
    Runtime: { type:String, required:true },
    Plot: { type:String,required:false,default:"" },   
    Actors: { type:String,required:false,default:"" },
    imdbID: { type:String,required:true }
    
});

module.exports = mongoose.model('Show',showSchema);