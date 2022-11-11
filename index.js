const express = require('express');
const mongoose = require("mongoose");
const Routes = require("./routes/routes");


const app = express();

mongoose.connect(`mongodb://localhost:/Youtube_admin`)
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

app.listen(8000, ()=> {
    console.log(`Server is running on port http://localhost:${8000}`);
})

app.use('/api', Routes);
module.exports = app;