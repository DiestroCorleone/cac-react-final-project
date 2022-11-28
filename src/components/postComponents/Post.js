import React from 'react';

export default function Post(props) {
  return (
    <article>
      <p>{props.postCreatorUsername}</p>
      <p>{props.postContent}</p>
      <small>{props.likedBy.length}</small>
    </article>
  );
}
