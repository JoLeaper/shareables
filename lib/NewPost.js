const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    }
});

module.exports = mongoose.model('NewPost', postSchema);

/* 
app.post('/new-post', async(req, res) => {
    const data = Note.execute(req.body)
    res.json(data.rows);
});

app.get('/get-one-post', async(req, res) => {
});

app.get('/get-all-posts', async(req, res) => {
});

app.patch('/update-post', async(req, res) => {
});

app.delete('/delete-post', async(req, res) => {
});
*/
