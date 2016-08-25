// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PaperSchema   = new Schema({
    subject : String,
    slot : String,
    courseCode : String,
    school : String,

});

module.exports = mongoose.model('Paper', PaperSchema);