var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var movieSchema = new Schema({

    name:{type:String,required:[true,"El nombre es requerido"]},
    description:{type:String},
    releaseYear:{type:String,required:false},
    img:{type:String,required:false},
    director:{type:String,required:false},
    actors:{type:String,required:false},
    generalScore:{type:Number,required:false}  

});

module.exports = mongoose.model('Movie',movieSchema);