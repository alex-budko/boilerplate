import React from 'react';

function Comment({ comment }) {
  return (
    <div>
      <p>Author: {comment.author}</p>
      <p>{comment.content}</p>
    </div>
  );
}

export default Comment;
