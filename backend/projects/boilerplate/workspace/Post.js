import React from 'react';
import CommentSection from './CommentSection';
import SocialMediaButtons from './SocialMediaButtons';

function Post() {
  return (
    <div>
      {/* Render blog post content */}
      <CommentSection />
      <SocialMediaButtons />
    </div>
  );
}

export default Post;
