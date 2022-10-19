const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    title:{
        type : String,
       // required: true
    },
    URL :{
        type: String,
        //required:true
    },
    description:{
        type: String,
       // required: true
    },
    dateUploaded: {
        type: Date ,
       // required:true
    }
})

module.exports = mongoose.model('Data',adminSchema);