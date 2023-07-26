import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import API from './API';

function PostForm() {
  const { id } = useParams();
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (id) {
      API.getPost(id).then((data) => {
        setTitle(data.title);
        setContent(data.content);
      });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const postData = {
      title,
      content,
    };

    if (id) {
      API.updatePost(id, postData).then(() => {
        history.push('/');
      });
    } else {
      API.createPost(postData).then(() => {
        history.push('/');
      });
    }
  };

  return (
    <div>
      <h2>{id ? 'Edit Post' : 'Create Post'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">{id ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
}

export default PostForm;
