import React from 'react';
import BlogPost from './blogPost';

function BlogPostList() {
  const blogPosts = [
    { id: 1, title: 'First Post', content: 'This is the first blog post.' },
    { id: 2, title: 'Second Post', content: 'This is the second blog post.' },
    { id: 3, title: 'Third Post', content: 'This is the third blog post.' },
  ];

  return (
    <div>
      {blogPosts.map((post) => (
        <BlogPost key={post.id} title={post.title} content={post.content} />
      ))}
    </div>
  );
}

export default BlogPostList;
