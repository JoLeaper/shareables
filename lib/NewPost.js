const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        min: 0
    }
});

postSchema.statics.execute = function(action){
    switch(action.type) {
        case 'add':
            //this.create
            return;
        case 'find-one':
            //this.findById()
            return;
        case 'find-all':
            //this.find()
            return;
        case 'update-likes':
            //this.findOneAndUpdate()
            return;
        case 'delete-post':
            //this.findByIdAndDelete()
            return;
        default:
            return;
    }
};

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
