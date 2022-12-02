import React, { useState, useContext } from "react";
import { nanoid } from "nanoid";
import { submitPost } from "../../adapters/FirebaseAdapters";
import { UserContext } from "../../context/UserContext";

export default function CreatePost(props) {
  const { loggedUser, setPosts } = useContext(UserContext);
  const [post, setPost] = useState({
    idPost: nanoid(),
    idUser: loggedUser.idUser,
    likedBy: [],
    postContent: "",
    postCreatorUsername: loggedUser.username,
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setPost((prevPost) => {
      return {
        ...prevPost,
        [name]: value,
      };
    });
    console.log(post);
  };

  const validatePost = (event) => {
    event.preventDefault();
    if (!post.postContent) {
      alert("Por favor, ingresá contenido en tu post.");
      return;
    }

    submitPost(post, loggedUser, setPosts);
    setPost({
      idPost: nanoid(),
      idUser: loggedUser.idUser,
      likedBy: [],
      postContent: "",
      postCreatorUsername: loggedUser.username,
    });
  };

  return (
    <div>
      <form onSubmit={validatePost}>
        <textarea
          type="text"
          placeholder="Compartí algo con tus fellow coders"
          value={post.postContent}
          onChange={handleChange}
          name="postContent"
          rows="10"
          required
        ></textarea>
        <br />
        <input type="submit" value="Crear post" />
      </form>
    </div>
  );
}
