var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    
    user: { type: Schema.Types.ObjectId, ref:'User', unique:true },
    show: { type: Schema.Types.ObjectId, ref:'Show', required:[true,'the movie id is required'], unique:true},
    score: { type: Number, required:[true,"the score is required"] },
    comment: { type: String },
    date: { type:String }
    
});

commentSchema.index({
    user: 1,
    show: 1,
  }, {
    unique: true,
  });

module.exports = mongoose.model('Comment',commentSchema);