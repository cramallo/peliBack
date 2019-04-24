var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var movieSchema = new Schema({

    name:{type:String,required:[true,"El nombre es requerido"]},
    description:{type:String,required:false,default:""},
    releaseYear:{type:String,required:false,default:""},
    img:{type:String,required:false,default:""},
    director:{type:String,required:false,default:""},
    actors:{type:String,required:false,default:""},
    generalScore:{type:Number,required:false,default:0}  

});

module.exports = mongoose.model('Movie',movieSchema);