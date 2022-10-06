// express setup
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

// initialize empty event store
const events = [];

// Routes and event handlers
// POST routes - send events to each service
app.post('/events', (req, res) => {
  const event = req.body;

  // add event to end of events array
  events.push(event);

  // send event to:
  // Post microservice
  axios.post('http://posts-clusterip-srv:4000/events', event).catch((err) => {
    console.log('Post failed');
    console.log(err.message);
  });
  // Comment microservice
  axios.post('http://comments-srv:4001/events', event).catch((err) => {
    console.log('Comment failed');
    console.log(err.message);
  });
  // Query microservice
  axios.post('http://query-srv:4002/events', event).catch((err) => {
    console.log('Query failed');
    console.log(err.message);
  });
  // Moderation microservice
  axios.post('http://moderation-srv:4003/events', event).catch((err) => {
    console.log('Moderation failed');
    console.log(err.message);
  });
  res.send({status: 'OK'});
})

// GET route - index of all events
app.get('/events', (req, res) => {
  res.send(events);
})
// Event bus listener
app.listen(4005, () => {
  console.log('Listening on 4005');
})
