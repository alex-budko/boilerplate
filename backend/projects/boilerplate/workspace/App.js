import React from 'react';
import Header from './Header';
import PostList from './PostList';
import CategoryList from './CategoryList';
import TagList from './TagList';

function App() {
  return (
    <div>
      <Header />
      <div className="container">
        <CategoryList />
        <div className="content">
          <PostList />
          <TagList />
        </div>
      </div>
    </div>
  );
}

export default App;
