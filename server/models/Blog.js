// Imports mongoose and extracts Schema into it's own variable
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creates a new Mongoose Schema with two properties
const blogSchema = new Schema({
    title: { type:String, required: true}, // firstName property is a string and required
    article: {type:String, required: true},
    published: {type:Date },
    featured: {type:Boolean },
   
    author: { type: Schema.Types.ObjectId, ref: 'User' }

});

module.exports = mongoose.model('Blog', blogSchema);
