import React, { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function CreatePost(props) {
  const { loggedUser } = useContext(UserContext);
  const [post, setPost] = useState({
    idUser: loggedUser.idUser,
    likedBy: [],
    postContent: "",
    postCreatorUsername: loggedUser.userName,
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

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Compartí algo con tus fellow coders"
          value={post.postContent}
          onChange="handleChange"
          name="postContent"
          required
        ></input>
        <input type="submit" value="Crear post" />
      </form>
    </div>
  );
}
