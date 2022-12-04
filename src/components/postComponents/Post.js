import React from 'react';

export default function Post(props) {
  return (
    <article className="border-black pad-mid m-small">
      <p>{props.postCreatorUsername}</p>
      <p>{props.postContent}</p>
      <small>
        <i className="fa fa-fafw fa-thumbs-o-up"></i> {props.likedBy.length}
      </small>
    </article>
  );
}
