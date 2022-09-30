// express setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// post data structure
/*
  {
    postId: {
      id: postId,
      title: 'post title',
      comments: [
        {
          id: commentId,
          content: 'comment content'
        }
      ]
    }
  }
*/
const posts = {};

// send all posts
app.get('/posts', (req, res) => {
  res.send(posts);
});

// event handler route
app.post('/events', (req, res) => {
  const { type, data } = req.body;

  if (type === 'PostCreated') {
    const { id, title  } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === 'CommentUpdated') {
    const { id, content, postId, status } = data

    // find post and comment
    const post = posts[postId]
    const comment = post.comments.find(comment => {
      return comment.id === id;
    });

    // update both status and content, as both may have changed
    comment.status = status
    comment.content = content
  }

  res.send({});
});

app.listen(4002, () => {
  console.log('Listening on 4002');
})
