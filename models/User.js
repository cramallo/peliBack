var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email:{ type : String,required:[true,"email is required"]},
    password:{ type : String, required:[true,"Password is required"]},
    name:{ type : String, required:[false]},
    lastname:{ type:String, required:[false]} 
});

module.exports = mongoose.model('User',userSchema);