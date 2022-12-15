import React, { useState, useContext } from "react";
import { nanoid } from "nanoid";
import { submitPost } from "../../adapters/FirebaseAdapters";
import { UserContext } from "../../context/UserContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

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
  };

  const validatePost = (event) => {
    event.preventDefault();
    if (!post.postContent) {
      alert("Por favor, ingresá contenido en tu post."); // este alert es redundante y no aparece en ningun momento, lo podemos borrar
      return;
    }

    try {
      submitPost(post, loggedUser, setPosts);
      setPost({
        idPost: nanoid(),
        idUser: loggedUser.idUser,
        likedBy: [],
        postContent: "",
        postCreatorUsername: loggedUser.username,
      });
    } catch (error) {
      MySwal.fire({
        title: "¡Error al crear tu publicación!",
        text: "No pudimos crear tu publicación:" + error,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <div className="card">
      <p className='post-username'>{loggedUser.username}</p>
      <form onSubmit={validatePost}>
        <textarea
          type="text"
          placeholder="Compartí algo con tus fellow coders"
          value={post.postContent}
          onChange={handleChange}
          name="postContent"
          rows="10"
          required
          className="post-textarea"
        ></textarea>
        <input type="submit" value="Crear post" className="button" />
      </form>
    </div>
  );
}
