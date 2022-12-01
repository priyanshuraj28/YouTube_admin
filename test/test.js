const chai = require("chai");
const server = require("../index")
const chaihttp = require("chai-http")
const { expect } = require("chai");
const Video = require("../model/video");
const testdata = require('./testdata')

chai.use(chaihttp);

describe("GET", () => {
    it("Getting all videos", () => {
        chai.request(server)
            .get('/api/viewAll').query({ pageoffset: 1, pageSize: 3 })
            .end((err, res) => {
                // console.log(res)
                expect(res).to.have.status(200);
            })
    })
    it("checking error message when pageSize is missing", () => {
        chai.request(server)
            .get('/api/viewAll').query({ pageoffset: 1 })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body.message).to.equal("Bad request");
            })
    })
    it("checking error message when pageoffset is missing", () => {
        chai.request(server)
            .get('/api/viewAll').query({ pageSize: 1 })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body.message).to.equal("Bad request");
            })
    })
})

describe("PUT", () => {
    it("checking error message when title contains numeric value", () => {
        const video = new Video(testdata.demoVideo);
        chai.request(server)
            .put('/api/update/' + video.id)
            .send({ title: "nums45hb", URL: "adhsicskjc", description: "bsdfjbfs" })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body.errors).to.be.a('array');
            })
    })
})

describe("POST", () => {
    it("it should post a video ", () => {
        const video = new Video(testdata.demoVideo);
        chai.request(server)
            .post('/api/post')
            .send(video)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('title');
                expect(res.body).to.have.property('URL');
                expect(res.body).to.have.property('description');

            })
    })
    it("it should not have URL so it can't post a video ", () => {
        const video = { title: "Movie", description: "bsdfjbfs" }
        chai.request(server)
            .post('/api/post')
            .send(video)
            .end((err, res) => {
                // console.log(">>>>>>>>>",res.body);
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                expect(res.body.message).to.equal('Bad Request')
            })
    })
    it("it should not have title so it can't post a video ", () => {
        const video = { URL: "www.youtube.com/movies", description: "TOP 10 movies" }
        chai.request(server)
            .post('/api/post')
            .send(video)
            .end((err, res) => {
                // console.log(">>>>>>>>>",res.body);
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                expect(res.body.message).to.equal('Bad Request')

            })
    })
})

describe("Delete", () => {
    it("it should delete a video ", async () => {
        const video = new Video(testdata.videoToDelete);
        await video.save();
        chai.request(server)
            .delete('/api/delete/' + video.id)
            .end((err, res) => {
                console.log(res.body)
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body.message).to.equal(`Document with ${video.id} has been deleted`);
            })
    })
    it("trying to delete a video which does not exist", async () => {
        const video = new Video(testdata.videoToDelete);
        chai.request(server)
            .delete('/api/delete/' + video.id)
            .end((err, res) => {
                console.log(res.body)
                expect(res).to.have.status(400);
                expect(res.body).to.be.a('object');
                expect(res.body.message).to.equal("Bad Request");
            })
    })
})