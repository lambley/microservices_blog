// comments microservice route file
// express setup
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

// routes
// READ: index
app.get('/posts/:id/comments', (req, res) => {
  // get array of comments for post id
  res.send(commentsByPostId[req.params.id]) || [];
})

// CREATE
app.post('/posts/:id/comments', (req, res) => {
  // randomise id
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  // check if comment for that post exist or return empty array
  const comments = commentsByPostId[req.params.id] || [];

  // add comment to comments array
  comments.push({id: commentId, content});
  commentsByPostId[req.params.id] = comments;

  // respond with new comments
  res.status(201).send(comments);
})

// port listener
app.listen(4001, () => {
  console.log("listening on 4001");
});
