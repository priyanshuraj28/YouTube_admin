const Video = require("../model/video");
const { validationResult } = require('express-validator');

const viewALL = async (pageoffset, pageSize) => {
    try {
        const videos = await Video.find().skip(pageSize * pageoffset).limit(pageSize);
        //console.log(data);
        return videos;
    }
    catch (err) {
        return null;
    }
}
const viewById = async (videoId) => {
    // if (!videoId) {
    //     res.status(400).json({
    //         message: error.message,
    //         success: false
    //     })
    // }
    try {
        const dataById = await Video.findById(videoId);
        console.log(dataById);
        return dataById;
    }
    catch (error) {
        return null;
    }
}

const post = async (video) => {
    try {
        const dataToSave = await video.save();
        //console.log(dataToSave);
        return dataToSave;
    }
    catch (error) {
        return null;
    }
}

const update = async (id, title, URL, dateUploaded, description) => {
    try {
        const options = { new: true };
        const result = await Video.findByIdAndUpdate(id, { $set: { URL, title, description, dateUploaded } }, options);
        return result;
    }
    catch (error) {
        return null;
    }
}

const deleteById = async (id) => {
    try {
        const deleteData = await Video.findByIdAndDelete(id);
        console.log("checking values", deleteData);
        return deleteData;
    }
    catch (error) {
        return null;
    }
}

module.exports = { viewALL, viewById, post, update, deleteById };