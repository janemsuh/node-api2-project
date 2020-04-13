const express = require('express');
const db = require('../data/db');
const router = express.Router();

// This handles the route 'POST /posts'
router.post('/', (req, res) => {
    try {
        if (!req.body.title || !req.body.contents) {
            res.status(400).json({
                message: 'Please provide title and contents for the post.'
            });
        } else {
            db.insert(req.body);
            res.status(201).json(req.body);
        }
    } catch {
        res.status(500).json({
            message: 'There was an error while saving the post to the database.'
        });
    }
});

// This handles the route 'POST /posts/:id/comments'
router.post('/:id/comments', (req, res) => {
    try {
        if (!req.body.text) {
            res.status(400).json({
                message: 'Please provide text for the comment.'
            });
        } else {
            const post = db.findById(req.param.id);
            if (post) {
                db.insertComment(req.body);
                res.status(201).json(req.body);
            } else {
                res.status(404).json({
                    message: 'The post with the specified ID does not exist.'
                });
            }
        }
    } catch {
        res.status(500).json({
            message: 'There was an error while saving the comment to the database.'
        });
    }
});

// This handles the route 'GET /posts'
router.get('/', (req, res) => {
    try {
        db.find();
    } catch {
        res.status(500).json({
            message: 'The posts information could not be retrieved.'
        });
    }
});

// This handles the route 'GET /posts/:id'
router.get('/:id', (req, res) => {
    try {
        const post = db.findById(req.params.id);
        if (post) {
            res.status(201).json(post);
        } else {
            res.status(404).json({
                message: 'The post with the specified ID does not exist.'
            });
        }
    } catch {
        res.status(500).json({
            message: 'The post information could not be retrieved.'
        });
    }
});

// This handles the route 'GET /posts/:id/comments'
router.get('/:id/comments', (req, res) => {
    try {
        const post = db.findById(req.params.id);
        if (post) {
            const comments = db.findPostComments(req.params.id);
            res.status(201).json(comments);
        } else {
            res.status(404).json({
                message: 'The post with the specified ID does not exist.'
            });
        }
    } catch {
        res.status(500).json({
            message: 'The comments information could not be retrieved.'
        });
    }
});

module.exports = router;