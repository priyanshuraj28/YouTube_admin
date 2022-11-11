const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const Video = require("../model/video");
const transaction = require("../transactions/transaction");
const { validationResult } = require('express-validator');

router.get('/viewAll', async (req, res) => {
    const {pageSize, pageoffset} = req.query;
    const video = await transaction.viewALL(pageoffset, pageSize);
    if (!video) {
        return res.status(400).json({ message: "Bad Request" })
    }
    res.status(200).json(video);
})

router.get('/viewOne/:id', async (req, res) => {
    const videoById = await transaction.viewById(req.params.id);
    if (!videoById) {
        return res.status(400).json({ message: "Bad Request" })
    }
    res.status(200).json(videoById);
})

router.post('/post', [
    body('title').isAlphanumeric().isLength(0, 50),
    body('description').isAlphanumeric().isLength(0, 100)], async (req, res) => {
        const date = new Date();
        const video = new Video({
            title: req.body.title,
            URL: req.body.URL,
            description: req.body.description,
            dateUploaded: date
        });
        const postVideo = await transaction.post(video);
        if (!postVideo) {
            return res.status(400).json({ message: "Bad Request" })
        }
        res.status(200).json(postVideo);
    });

router.put('/update/:ID', [
    body('title').isAlpha().isLength(0, 50),
    body('description').isAlpha().isLength(0, 100)],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const id = req.params.ID;
        const updatedData = req.body;
        const {
            URL,
            title,
            description,
            dateUploaded
        } = updatedData;
        if (!URL) {
            return res.status(400).json('Bad request')
        }
        const updatedVideo = await transaction.update(id, title, URL, dateUploaded, description);
        if (!updatedVideo) {
            return res.status(400).json({ message: "Bad Request" })
        }
        res.status(200).send(updatedVideo);
    });

router.delete('/delete/:id', async (req, res) => {
    const deleteVideo = await transaction.deleteById(req.params.id);
    if (!deleteVideo) {
        return res.status(400).json({ message: "Bad Request" })
    }
    res.send({ message: `Document with ${deleteVideo.id} has been deleted` });
});

module.exports = router;