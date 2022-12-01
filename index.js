require('dotenv').config()
const express = require('express');
const mongoose = require("mongoose");
const Routes = require("./routes/routes");
const cors = require('cors');

let db_url;
if(process.env.NODE_ENV=="dev"){
    db_url = process.env.DB_URL;
}
else if(process.env.NODE_ENV=="test"){
    db_url = process.env.DB_TEST_URL;
}


const app = express();

mongoose.connect(db_url)
    .then(()=> {
         console.log("Connection is successfull")
    })
    .catch((err)=>{
            console.log(`Database connection error`);
    })

//const database = mongoose.connection;
// database.on('err or', (error) => {
//     console.log('database error')
// })
// database.once('connected', () => {
//     console.log('database connected')
// })
app.use(express.json());
app.use(cors());
app.listen(8000, ()=> {
    console.log(`Server is running on port http://localhost:${8000}`);
})

app.use('/api', Routes);
module.exports = app;