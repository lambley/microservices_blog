import React, { useState, useEffect } from "react";
import axios from 'axios';
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const PostList = () => {
  // Posts state - default Object
  const [posts, setPosts] = useState({});

  // fetch Posts
  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:4000/posts');

    setPosts(res.data)
  }

  // ensure fetchPosts is called once only
  useEffect(() => {
    fetchPosts();
  }, []);

  // return array of Post objects
  const renderedPosts = Object.values(posts).map(post => {
    return (
      <div
        className="card col-3 m-3"
        key={post.id}
      >
        <div className="card-body">
          <h3 className="card-title">{post.title}</h3>
          <CommentList postId={post.id}/>
          <CommentCreate postId={post.id} />
        </div>
      </div>
    )
  })

  // PostList component
  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  )
}

export default PostList;
