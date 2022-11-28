import React from 'react';
import Post from './Post';

export default function RenderPosts(props) {
  const renderPosts = props.posts.map((post) => {
    return (
      <Post
        key={post.idPost}
        postCreatorUsername={post.postCreatorUsername}
        postContent={post.postContent}
        likedBy={post.likedBy}
      />
    );
  });
  return <>{renderPosts}</>;
}
