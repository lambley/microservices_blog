// comments microservice route file
// express setup
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const axios = require('axios');
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
app.post('/posts/:id/comments', async (req, res) => {
  // randomise id
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  // check if comment for that post exist or return empty array
  const comments = commentsByPostId[req.params.id] || [];

  // add comment to comments array, add default moderation status
  comments.push({id: commentId, content, status: 'pending'});
  commentsByPostId[req.params.id] = comments;

  // send CommentCreated event to event bus
  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: {
      id: commentId,
      content,
      postId: req.params.id,
      status: 'pending'
    }
  })

  // respond with new comments
  res.status(201).send(comments);
})

// Comment request handler
app.post('/events', (req, res) => {
  // log event type received
  console.log('Received event', req.body.type);

  res.send({});
})

// port listener
app.listen(4001, () => {
  console.log("listening on 4001");
});
