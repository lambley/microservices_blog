// comments microservice route file
// express setup
const express = require('express');
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

// routes
// READ: index
app.get('/posts', (req, res) => {
  res.send(posts);
});

// CREATE
app.post('/posts', async (req, res) => {
  // generate random hex id
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  // create post object with id
  posts[id] = {
    id, title
  };

  // send created post to event-bus
  await axios.post('http://localhost:4005/events', {
    type: 'PostCreated',
    data: {
      id, title
    }
  })

  res.status(201).send(posts[id]);
});

// Post request handler
app.post('/events', (req, res) => {
  // log event type received
  console.log('Received event', req.body.type);

  res.send({});
})

// port listener
app.listen(4000, () => {
  console.log("listening on 4000");
});
