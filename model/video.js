const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
    title:{
        type : String,
        required: true,
        trim: true
    },
    URL:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required: true
    },
    dateUploaded:{
        type: Date,
        required:true
    }
})

module.exports = mongoose.model('Video',videoSchema);