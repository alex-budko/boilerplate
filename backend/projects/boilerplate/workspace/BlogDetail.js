import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Comment from './Comment';

function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(`/api/blogs/${id}`)
      .then(response => {
        setBlog(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    axios.get(`/api/blogs/${id}/comments`)
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

  return (
    <div>
      {blog ? (
        <div>
          <h2>{blog.title}</h2>
          <p>Author: {blog.author}</p>
          <p>{blog.content}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <h3>Comments</h3>
      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

export default BlogDetail;
