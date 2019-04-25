var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({

    user: { type: Schema.Types.ObjectId, ref:'User' },
    show: { type: Schema.Types.ObjectId, ref:'Show', required:[true,'the movie id is required']},
    score: { type: Number, required:[true,"the score is required"] },
    comment: { type: String },
    date: { type:String }
    
});

module.exports = mongoose.model('Comment',commentSchema);