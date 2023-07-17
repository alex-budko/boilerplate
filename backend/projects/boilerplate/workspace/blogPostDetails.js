import React from 'react';

function BlogPostDetails({ postId }) {
  // Fetch blog post details based on postId
  const blogPost = { id: postId, title: 'Post Title', content: 'Post Content' };

  return (
    <div>
      <h2>{blogPost.title}</h2>
      <p>{blogPost.content}</p>
    </div>
  );
}

export default BlogPostDetails;
