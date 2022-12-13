import React, { useState, useContext } from "react";
import { likePost, deletePost } from "../../adapters/FirebaseAdapters";
import { UserContext } from "../../context/UserContext";

export default function Post(props) {
  const [isPostLiked, setIsPostLiked] = useState(
    false || props.likedBy.includes(props.idUser)
  );
  const [numberOfLikes, setNumberOfLikes] = useState(0 || props.likedBy.length);
  const { setPosts } = useContext(UserContext);

  return (
    <article className="border-black pad-mid m-small">
      {props.idUser === props.postCreatorId && (
        <i
          className="fa fa-fw fa-trash pointer"
          onClick={() =>
            deletePost(
              props.idPost,
              props.idUser,
              props.postCreatorId,
              setPosts
            )
          }
          title="Eliminar post"
        ></i>
      )}
      <p>{props.postCreatorUsername}</p>
      <p>{props.postContent}</p>
      <small>
        <i
          onClick={() =>
            likePost(
              props.idPost,
              props.idUser,
              isPostLiked,
              setIsPostLiked,
              numberOfLikes,
              setNumberOfLikes
            )
          }
          className={`cursor-pointer fa fa-fw ${
            isPostLiked ? "fa-thumbs-up" : "fa-thumbs-o-up"
          }`}
        ></i>{" "}
        {numberOfLikes}
      </small>
    </article>
  );
}
