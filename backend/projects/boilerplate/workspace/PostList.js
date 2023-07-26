import React from 'react';
import Post from './Post';

function PostList() {
  return (
    <div>
      {/* Render list of blog posts */}
      <Post />
      <Post />
      <Post />
    </div>
  );
}

export default PostList;
