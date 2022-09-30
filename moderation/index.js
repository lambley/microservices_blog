// moderation microservice route file
// express setup
const express = require('express');
const bodyParser = require('body-parser')
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

// routes
// send comment moderation event
app.post('/events', async (req, res) => {
  const { type, data } = req.body

  // check if event is comment
  if (type === 'CommentCreated') {
    // check if comment contains moderation string
    const status = data.content.includes('orange') ? 'rejected' : 'approved';

    // post CommentModerated event to event bus
    const { id, postId, content } = data
    await axios.post('http://localhost:4005/events', {
      type: 'CommentModerated',
      data: {
        id,
        postId,
        status,
        content
      }
    }).catch((err) => {
      console.log(err.message);
    });
  }

  res.send({});
})

// event listener
app.listen(4003, () => {
  console.log('listening on 4003');
});
