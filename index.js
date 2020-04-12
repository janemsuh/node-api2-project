const express = require('express');
// const postsRouter = require('./posts/posts-router');

const server = express();
const port = 8000;

server.use(express.json());
// server.use('/posts', postsRouter);

server.get('/', (req, res) => {
    res.json('hello from the blog posts API!')
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});