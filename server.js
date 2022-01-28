require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const url = require('url').URL;
let mongoose = require('mongoose');
const { Schema } = mongoose;
const urlSchema = new Schema ({
    originalUrl: {type: String},
    shortUrl: Number
});
mongoose.connect(process.env.MONGU_URI, { useNewUrlParser: true});
let URL = mongoose.model('URL', urlSchema);
// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

//url validation method
const isURLValid = (s) => {
    try {
        new URL(s);
        return true;
    } catch (err) {
        return false;
    }
};

//This method is designed to provide a response for a short url
app.post('/api/shorturl', (req, res) => {
    if(!isURLValid(req.original_url)) { res.json({"error": "invalid url"})};
    const oldURL = new URL({ originalUrl: req.original_url, shortUrl: Math.floor(Math.random() * max) });
    oldURL.save((err, date) => {
        if(err) return console.err();
        done(null, data);
    });
    next();
}, (req, res) => {
    res.json({
        "test": "test"
    });
});
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
