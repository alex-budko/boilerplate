import React, { useEffect, useState } from 'react';
import BlogPostList from './blogpost_list';
import BlogPostAPI from './blogpost_api';

function BlogPostListContainer() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await BlogPostAPI.getPosts();
      setPosts(posts);
    };
    fetchPosts();
  }, []);

  const handleDelete = async (post) => {
    await BlogPostAPI.deletePost(post);
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  return <BlogPostList posts={posts} onDelete={handleDelete} />;
}

export default BlogPostListContainer;
