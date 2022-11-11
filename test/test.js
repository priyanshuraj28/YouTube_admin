const chai = require("chai");
const server = require("../index")
const chaihttp = require("chai-http")
const { expect } = require("chai");
const Video = require("../model/video");

chai.use(chaihttp);

describe("GET", () => {
    it("Getting all videos", (done) => {
        chai.request(server)
            .get('/api/viewAll').query({pageoffset : 1, pageSize : 3})
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            })
    })
})

describe("PUT", () => {
    it("checking error message when title contains numeric value", (done) => {
        const video = new Video({ title: "Movie", URL: "adhsicskjc", description: "bsdfjbfs" })
        chai.request(server)
            .put('/api/update/' + video.id)
            .send({ title: "nums45hb", URL: "adhsicskjc", description: "bsdfjbfs" })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body.errors).to.be.a('array');
                done();
            })
    })
})

describe("POST", () => {
    it("it should post a video ", (done) => {
        const video = { title: "Movie", URL: "adhsicskjc", description: "bsdfjbfs" }
        chai.request(server)
            .post('/api/post')
            .send(video)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('title');
                expect(res.body).to.have.property('URL');
                expect(res.body).to.have.property('description');
                done();
            })
    })
    it("it should not have URL so it can't post a video ", (done) => {
        const video = { title: "Movie", description: "bsdfjbfs" }
        chai.request(server)
            .post('/api/post')
            .send(video)
            .end((err, res) => {
                // console.log(">>>>>>>>>",res.body);
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                expect(res.body.message).to.equal('Video validation failed: URL: Path `URL` is required.')
                done();
            })
    })
    it("it should not have title so it can't post a video ", (done) => {
        const video = { URL: "www.youtube.com/movies", description: "TOP 10 movies" }
        chai.request(server)
            .post('/api/post')
            .send(video)
            .end((err, res) => {
                // console.log(">>>>>>>>>",res.body);
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                expect(res.body.message).to.equal('Video validation failed: title: Path `title` is required.')
                done();
            })
    })
})

describe("Delete", () => {
    it("it should delete a video ", async() => {
        const video = new Video ({ title: "Movie", URL: "adhsicskjc", description: "bsdfjbfs", dateUploaded: "2022-11-07T08:01:18.942Z"})
        await video.save();
        chai.request(server)
            .delete('/api/delete/'+ video.id)
            .end((err, res) => {
                console.log(res.body)
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body.message).to.equal(`Document with ${video.id} has been deleted`);
            })
    })
})