const express = require('express');
const app = express();
const NewPost = require('./NewPost');

app.use(require('cors')());
app.use(express.json());

app.post('/new-post', (req, res) => {
    NewPost
        .create(req.body)
        .then(newpost => res.send(newpost));
});

app.get('/all-posts', (req, res) => {
    NewPost
        .find()
        .then(posts => res.send(posts));
});

app.get('/all-posts/:id', (req, res) => {
    NewPost
        .findById(req.params.id)
        .then(foundpost => res.send(foundpost));
});

app.patch('/add-like', (req, res) => {
    NewPost
        .findByIdAndUpdate(
            { _id: req.params.id },
            { $inc: { likes:1 } },
            { new: true })
        .then(updatedpost => res.send(updatedpost));
});

app.delete('/delete-post', (req, res) => {
    NewPost
        .findByIdAndDelete(req.params.id)
        .then(deletedpost => res.send(deletedpost));
});

module.exports = app;
