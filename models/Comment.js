var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    
    user: { type: Schema.Types.ObjectId, ref:'User',required:[true,'the user id is required']},
    show: { type: Schema.Types.ObjectId, ref:'Show', required:[true,'the movie id is required']},
    imdbID:{ type:String},
    score: { type: Number, required:[true,"the score is required"] },
    comment: { type: String },
    date: { type:String }
    
});

module.exports = mongoose.model('Comment',commentSchema);