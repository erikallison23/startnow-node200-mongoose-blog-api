const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

//mongoose.connect('mongodb://localhost/my-blog', { useMongoClient: true });
mongoose.connect('mongodb://heroku_9jg6hmr6:m7q6nbiubto0fqumveim5npcvj@ds245518.mlab.com:45518/heroku_9jg6hmr6');
mongoose.Promise = Promise;

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.status(200).send('Do /api/blogs or api/users');
});

app.use('/api/users', require('./routes/users'));
app.use('/api/blogs', require('./routes/blogs'))


module.exports = app;