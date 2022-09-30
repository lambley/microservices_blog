// moderation microservice route file
// express setup
const express = require('express');
const bodyParser = require('body-parser')
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

// routes
// send comment moderation event
app.post('/events', (req, res) => {

})

// event listener
app.listen(4003, () => {
  console.log('listening on 4003');
});
