const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');
const User = require("../models/user");

router.get('/', (req, res) => {
    Blog
        .find()
        .then(blogs => {
            res.status(200).json(blogs);
        })
        .catch(e => res.status(500).send('bad'));
});

router.get("/featured", (req, res) => {
    Blog
        .where({
            blogs: "featured"
        })
        .then(blogs => {
            res.status(200).json(blogs);
        })
        .catch(e => res.status(500).send('bad'));
});

router.get('/:id', (req, res) => {
    Blog
        .findById(req.params.id)
        .then(blogs => {
            if (!blogs) res.status(404).send(null);
            res.status(200).json(blogs);
        })
        .catch(e => res.status(500).send('bad'));
});



router.post('/', (req, res) => {
    let dbUser = null;

    User.findById(req.query.userId)
        .then(user => {
            dbUser = user;
            const newBlog = new Blog(req.body);
            newBlog.author = user._id;
            return newBlog.save();
        })
        .then(blog => {
            dbUser.blogs.push(blog);
            dbUser.save().then(() => res.status(201).json(blog));
        })

        .catch(e => res.status(500).send('bad'));
        

});


router.put('/:id', (req, res) => {
    Blog
        .findByIdAndUpdate(req.params.id, {
            $set: req.body
        })
        .then(blogs => {
            res.status(204).json(blogs);
        })
        .catch(e => res.status(500).send('bad'));
});

router.delete('/:id', (req, res) => {
    console.log(2)
    let id = req.params.id;
    Blog
        .findByIdAndRemove(id)
        .then(blogs => {
            res.status(200).json(blogs);
        })
        .catch(console.error);
});

// GET - 200 / 404
// GET - 200 / 404
// POST - 201 / 404
// PUT - 204 / 404
// DELETE - 200 / 404

module.exports = router;