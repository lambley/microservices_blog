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

  switch(type) {
    case 'PostCreated':
      // create new post in query service, with no comments as default
      posts[data.id] = {
        id: data.id,
        title: data.title,
        comments: []
      };
      break;
    case 'CommentCreated':
      // find post comment belongs to and add comment
      const createdPost = posts[data.postId]
      createdPost.comments.push({
        id: data.id,
        content: data.content,
        status: data.status
      })
      break;
    case 'CommentUpdated':
      // find post comment belongs to and update comments status and content
      const updatedPost = posts[data.postId]
      const comment = updatedPost.comments.find(comment => {
        return comment.id === data.id;
      });
      // update both status and content, as both may have changed
      comment.status = data.status
      comment.content = data.content
      break;
  }

  res.send({});
});

app.listen(4002, () => {
  console.log('Listening on 4002');
})
