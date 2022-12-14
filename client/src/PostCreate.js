import React, { useState } from "react";
import axios from 'axios'

const PostCreate = () => {
  // Title state
  const [title, setTitle] = useState('');

  // form submit async function
  const onSubmit = async (event) => {
    event.preventDefault();

    await axios.post('http://posts.com/posts/create', {
      title
    });

    setTitle('');
    // reload page on submit
    window.location.reload(false)
  };

  // PostCreate component
  return <div>
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="">Title</label>
        <input
          value={title}
          onChange={e => setTitle(e.target.value) }
          type="text"
          className="form-control"
        />
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  </div>;
}

export default PostCreate;
