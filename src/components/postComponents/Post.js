import React, { useState, useContext } from "react";
import { likePost, deletePost } from "../../adapters/FirebaseAdapters";
import { UserContext } from "../../context/UserContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function Post(props) {
  const [isPostLiked, setIsPostLiked] = useState(false || props.likedBy.includes(props.idUser));
  const [numberOfLikes, setNumberOfLikes] = useState(0 || props.likedBy.length);
  const { setPosts } = useContext(UserContext);

  const confirmDelete = () => {
    MySwal.fire({
      title: "¿Estás seguro que quieres eliminar esta publicación?",
      text: "No podrás recuperarla después de eliminarla",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deletePost(props.idPost, props.idUser, props.postCreatorId, setPosts);
      }
    });
  };

  return (
    <article className="border-black pad-mid m-small">
      {props.idUser === props.postCreatorId && (
        <i className="fa fa-fw fa-trash pointer" onClick={() => confirmDelete()} title="Eliminar post"></i>
      )}
      <p>{props.postCreatorUsername}</p>
      <p>{props.postContent}</p>
      <small>
        <i
          onClick={() =>
            likePost(props.idPost, props.idUser, isPostLiked, setIsPostLiked, numberOfLikes, setNumberOfLikes)
          }
          className={`cursor-pointer fa fa-fw ${isPostLiked ? "fa-thumbs-up" : "fa-thumbs-o-up"}`}
        ></i>{" "}
        {numberOfLikes}
      </small>
    </article>
  );
}
