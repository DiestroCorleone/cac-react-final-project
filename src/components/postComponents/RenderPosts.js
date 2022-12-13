import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Post from "./Post";

export default function RenderPosts(props) {
  const { loggedUser } = useContext(UserContext);

  const renderPosts = props.posts.map((post) => {
    return (
      <Post
        key={post.idPost}
        idPost={post.idPost}
        postCreatorId={post.idUser}
        postCreatorUsername={post.postCreatorUsername}
        postContent={post.postContent}
        likedBy={post.likedBy}
        idUser={loggedUser.idUser}
      />
    );
  });
  return <>{renderPosts}</>;
}
