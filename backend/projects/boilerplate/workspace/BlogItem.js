import React from 'react';
import { Link } from 'react-router-dom';

function BlogItem({ blog }) {
  return (
    <div>
      <h2>{blog.title}</h2>
      <p>Author: {blog.author}</p>
      <p>{blog.summary}</p>
      <Link to={`/blog/${blog.id}`}>Read More</Link>
    </div>
  );
}

export default BlogItem;
