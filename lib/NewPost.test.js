const NewPost = require('./NewPost');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('./app');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongodb = new MongoMemoryServer();

describe('routes', () => {
    beforeAll(() => {
        return mongodb.getUri()
            .then(uri => mongoose.connect(uri, {
                useUnifiedTopology: true,
                useNewUrlParser: true
            }));
    });
    
    beforeEach(() => {
        return mongoose.connection.dropDatabase();
    });

    afterAll(() => {
        return mongoose.connection.close()
            .then(() => mongodb.stop());
    });

    it('creates a new post', () => {
        return request(app)
            .post('/new-post')
            .send({
                url: 'http://jojojo.com',
                description: 'woah, how cool!'
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.anything(),
                    url: 'http://jojojo.com',
                    description: 'woah, how cool!',
                    likes: 0,
                    __v: 0
                });
            });
    });

    it('creates get all the posts back', () => {
        return request(app)
            .post('/new-post')
            .send({
                url: 'http://jojojo.com',
                description: 'woah, how cool!'
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.anything(),
                    url: 'http://jojojo.com',
                    description: 'woah, how cool!',
                    likes: 0,
                    __v: 0
                },
                {
                    _id: expect.anything(),
                    url: 'http://jojojo.com',
                    description: 'woah, how cool!',
                    likes: 0,
                    __v: 0
                });
            });
    });

});
