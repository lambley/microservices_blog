// express setup
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

// Routes and event handlers
app.post('/events', (req, res) => {
  const event = req.body;

  // send event to:
  // Post microservice
  axios.post('http://localhost:4000/events', event).catch((err) => {
    console.log('Post failed');
    console.log(err.message);
  });
  // Comment microservice
  axios.post('http://localhost:4001/events', event).catch((err) => {
    console.log('Comment failed');
    console.log(err.message);
  });
  // Query microservice
  axios.post('http://localhost:4002/events', event).catch((err) => {
    console.log('Query failed');
    console.log(err.message);
  });
  // Moderation microservice
  axios.post('http://localhost:4003/events', event).catch((err) => {
    console.log('Moderation failed');
    console.log(err.message);
  });
  res.send({status: 'OK'});
})

// Event bus listener
app.listen(4005, () => {
  console.log('Listening on 4005');
})
