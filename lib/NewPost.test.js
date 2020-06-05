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

    it('returns a list of every post', async() => {
        await NewPost.create(
            {
                url: 'http://jojojo.com',
                description: 'woah, how cool!'
            }
        );
        await NewPost.create(
            {
                url: 'http://momomo.com',
                description: 'spectacular!'
            }
        );
        
        return request(app)
            .get('/all-posts')
            .then(res => {
                expect(res.body).toEqual([{
                    _id: expect.anything(),
                    url: 'http://jojojo.com',
                    description: 'woah, how cool!',
                    likes: 0,
                    __v: 0
                },
                {
                    _id: expect.anything(),
                    url: 'http://momomo.com',
                    description: 'spectacular!',
                    likes: 0,
                    __v: 0
                }]);
            });
    });

    it('returns a specific post by id', async() => {
        NewPost.create(
            {
                url: 'http://jojojo.com',
                description: 'woah, how cool!'
            }
        );
        const post1 = await NewPost.create(
            {
                url: 'http://momomo.com',
                description: 'spectacular!'
            }
        );
        return request(app)
            .get(`/all-posts/${post1._id}`)
            .then(res => {
                expect(res.body).toEqual({
                    _id: post1.id,
                    url: 'http://momomo.com',
                    description: 'spectacular!',
                    likes: 0,
                    __v: 0
                },);
            });
    });

    it('updates likes for a specific post', async() => {
        NewPost.create(
            {
                url: 'http://jojojo.com',
                description: 'woah, how cool!'
            }
        );
        const post1 = await NewPost.create(
            {
                url: 'http://momomo.com',
                description: 'spectacular!'
            }
        );
        return request(app)
            .patch(`/all-posts/${post1._id}`)
            .then(res => {
                expect(res.body).toEqual({
                    _id: post1.id,
                    url: 'http://momomo.com',
                    description: 'spectacular!',
                    likes: 1,
                    __v: 0
                },);
            });
    });

    it('deletes a post', async() => {
        const post1 = await NewPost.create(
            {
                url: 'http://jojojo.com',
                description: 'woah, how cool!'
            }
        );

        return request(app)
            .delete(`/all-posts/${post1._id}`)
            .then(res => {
                expect(res.body).toEqual({
                    _id: post1.id,
                    url: post1.url,
                    description: post1.description,
                    likes: 0,
                    __v: 0
                },);
            });
    });
});
