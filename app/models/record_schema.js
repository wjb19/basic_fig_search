var mongoose = require('mongoose');

var recordSchema = new mongoose.Schema({
        url: String,
        type: String,
        image: String,
        data: String
});

module.exports=mongoose.model('docs',recordSchema);
