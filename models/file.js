const mongoose = require('mongoose');

const FileSchema = mongoose.Schema({
    userId:{type:mongoose.Schema.ObjectId},
    originalname: {type: String},
    mimetype: {type: String},
    path:{type:String},
    size:{type:Number},
})
module.exports = mongoose.model('File', FileSchema);

