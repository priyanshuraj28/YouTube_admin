const express = require('express');
const router = express.Router();
const Data = require("../model/model")

router.get('/getAll', async(req,res)=>{
    try{
        const data = await Data.find(); 
        res.json(data);
        //console.log(data);
    }
    catch(err){  
        res.status(400).json({message: err.message});
    }
})

router.post('/post', async(req , res) => {
    const data = new Data(req.body)
    try{
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
    // data.save().then(()=>{
    //     res.status(200).send(data);
    // }).catch((error)=>{
    //     res.status(400).json({message:error.message});
    // })
})

router.put('/update/:ID', async(req , res) => {
    try{
        const id = req.params.ID;
        const updatedData = req.body;
        const options = {new: true};
        const result = await Data.findByIdAndUpdate(id, updatedData, options);
        res.send(result);
    }
    catch(error){
        res.status(400).json({message: error.message});
    }
})

// router.put('/update/:id',function(req,res,next){
//     Student.findOneAndUpdate({_id: req.params.id},req.body).then(function(student){
//         Student.findOne({_id: req.params.id}).then(function(student){
//             res.send(student);
//         });
//     });
// });

module.exports = router;