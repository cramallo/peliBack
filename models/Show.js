var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var showSchema = new Schema({

    title: { type:String,required:[true,"The title is required"] },
    genre: { type:String,required:[true,"The genre is required"] },
    type: { type: String, required:[true,"the type is required"] },
    coverSource: { type:String,required:false,default:"" },
    score: { type:Number,required:false,default:0 },
    year: { type:String,required:false,default:"" },   
    director: { type:String,required:false,default:"" },
    duration: { type: Number, required:true },
    description: { type:String,required:false,default:"" },   
    actors: { type:String,required:false,default:"" },

});

module.exports = mongoose.model('Show',showSchema);