// express setup
const express = require('express');
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')
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
app.post('/posts', (req, res) => {
  // generate random hex id
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  // create post object with id
  posts[id] = {
    id, title
  };

  res.status(201).send(posts[id]);
});

// port listener
app.listen(4000, () => {
  console.log("listening on 4000");
});
