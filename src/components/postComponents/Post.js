import React, { useState } from 'react';
import { likePost } from '../../adapters/FirebaseAdapters';

export default function Post(props) {
  const [isPostLiked, setIsPostLiked] = useState(
    false || props.likedBy.includes(props.idUser)
  );
  const [numberOfLikes, setNumberOfLikes] = useState(0 || props.likedBy.length);

  return (
    <article className="border-black pad-mid m-small">
      <p>{props.postCreatorUsername}</p>
      <p>{props.postContent}</p>
      <small>
        <i
          onClick={() =>
            likePost(props.idPost, props.idUser, isPostLiked, setIsPostLiked, numberOfLikes, setNumberOfLikes)
          }
          className={`cursor-pointer fa fa-fw ${
            isPostLiked ? 'fa-thumbs-up' : 'fa-thumbs-o-up'
          }`}
        ></i>{' '}
        {numberOfLikes}
      </small>
    </article>
  );
}
