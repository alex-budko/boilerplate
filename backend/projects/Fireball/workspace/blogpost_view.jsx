import React from 'react';

function BlogPostView({ post }) {
  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>Author: {post.author}</p>
      <p>Publication Date: {post.publication_date}</p>
    </div>
  );
}

export default BlogPostView;
