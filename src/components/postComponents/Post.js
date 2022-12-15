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
		<article className="card">
			<div className="post-header">
				<p className="post-username">{props.postCreatorUsername}</p>
				{props.idUser === props.postCreatorId && (
				<i className="fa fa-fw fa-trash delete-post" onClick={() =>deletePost(props.idPost, props.idUser, props.postCreatorId, setPosts)} title="Eliminar post"></i>
			)}
			</div>
			<p className="post-content">{props.postContent}</p>
			<small className="post-likes">
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
					className={`like-post fa fa-fw ${
						isPostLiked ? "fa-thumbs-up" : "fa-thumbs-o-up"
					}`}
				></i>{" "}
				{numberOfLikes}
			</small>
		</article>
  );
}
