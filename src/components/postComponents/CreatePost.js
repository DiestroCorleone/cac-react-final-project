import React, { useState, useContext } from 'react';
import { nanoid } from 'nanoid';
import { submitPost } from '../../adapters/FirebaseAdapters';
import { UserContext } from '../../context/UserContext';

export default function CreatePost(props) {
  const { loggedUser, setPosts } = useContext(UserContext);
  const [post, setPost] = useState({
    idPost: nanoid(),
    idUser: loggedUser.idUser,
    likedBy: [],
    postContent: '',
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
      alert('Por favor, ingresá contenido en tu post.');
      return;
    }

    try {
      submitPost(post, loggedUser, setPosts);
      setPost({
        idPost: nanoid(),
        idUser: loggedUser.idUser,
        likedBy: [],
        postContent: '',
        postCreatorUsername: loggedUser.username,
      });
    } catch (error) {
      alert('Error publicando post: ' + error);
    }
  };

  return (
    <div className="width-responsive">
      <form onSubmit={validatePost}>
        <textarea
          type="text"
          placeholder="Compartí algo con tus fellow coders"
          value={post.postContent}
          onChange={handleChange}
          name="postContent"
          rows="10"
          required
          className="width-full pad-small"
        ></textarea>
        <br />
        <br />
        <input
          type="submit"
          value="Crear post"
          className="pad-mid back-black color-grey"
        />
      </form>
    </div>
  );
}
