import { db, storage, authentication as auth } from "./initFirebase";
import {
  collection,
  query,
  getDocs,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

/*-------------REGISTRO Y LOGIN-------------*/
// Registro de usuario
export const createUser = (email, username, password, redirectToLogin) => {
  // Llamamos a la función para crear un usuario.
  createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
    // Guardamos el ID de usuario devuelto en una variable.
    const user = userCredential.user;

    // Creamos un nuevo documento en la colección 'users' con los datos obtenidos.
    setDoc(doc(db, "users", user.uid), {
      idUser: user.uid,
      email: email,
      username: username,
      bio: "",
      likedPosts: [],
      createdPosts: [],
      profilePicURL: "",
    })
      .then((res) => {
        MySwal.fire({
          title: "¡Creación exitosa!",
          text: "¡Tu usuario se creó correctamente!",
          icon: "success",
          confirmButtonText: "Ok",
        });
        redirectToLogin();
      })
      .catch((error) => {
        MySwal.fire({
          title: "¡Error al crear tu usuario!",
          text: "No pudimos crear tu usuario:" + error,
          icon: "error",
          confirmButtonText: "Ok",
        });
      });
  });
};

// Inicio de sesión
export const login = (email, password, setIsUserLogged, setLoggedUser, redirectAfterLogin) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      if (user) {
        getUser(setLoggedUser, setIsUserLogged, user.uid, redirectAfterLogin);
      } else {
        MySwal.fire({
          title: "¡Error!",
          text: "No pudimos iniciar tu sesión :(",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    })
    .catch((error) => {
      MySwal.fire({
        title: "¡Error!",
        text: error,
        icon: "error",
        confirmButtonText: "Ok",
      });
    });
};

// Cerrar sesión
export const signOutAccount = (setIsUserLogged, setLoggedUser, redirectAfterSignout) => {
  signOut(auth)
    .then(() => {
      setIsUserLogged(false);
      setLoggedUser({});
      MySwal.fire({
        title: "Sesión finalizada",
        text: "¡Esperamos que vuelvas pronto!",
        icon: "success",
        confirmButtonText: "Ok",
      });
      redirectAfterSignout();
    })
    .catch((error) =>
      MySwal.fire({
        title: "¡Error al cerrar sesión!",
        text: "No pudimos cerrar tu sesión:" + error,
        icon: "error",
        confirmButtonText: "Ok",
      })
    );
};

/*-------------OBTENIENDO POSTS Y USUARIOS-------------*/
// Query que indicará qué base de datos y colección consultar.
const postQuery = query(collection(db, "posts"));

export const getPosts = (setPosts) => {
  const getAllPosts = async () => {
    const res = await getDocs(postQuery); // Traemos todos los documentos en base a la query previa.
    const retrievedPosts = [];
    res.docs.map((post) => retrievedPosts.push(post.data())); // Mapeamos la respuesta al array vacío.
    setPosts(retrievedPosts); // Seteamos ese array como estado.
  };

  try {
    getAllPosts();
  } catch (error) {
    MySwal.fire({
      title: "¡Error!",
      text: "No pudimos recuperar tus publicaciones:" + error,
      icon: "error",
      confirmButtonText: "Ok",
    });
  }
};

// Traemos un usuario por ID.
export const getUser = (setLoggedUser, setIsUserLogged, id, redirectAfterLogin) => {
  const userRef = doc(db, "users", id); // Creamos una 'referencia', que se empleará en conjunto con getDoc().
  try {
    getDoc(userRef).then((res) => {
      // Traemos el documento en base a la referencia.
      setLoggedUser(res.data());
      setIsUserLogged(true);
      MySwal.fire({
        title: "¡Bienvenido!",
        text: "Sesión iniciada correctamente!",
        icon: "success",
        confirmButtonText: "Ok",
      });
      redirectAfterLogin();
    });
  } catch (error) {
    MySwal.fire({
      title: "¡Error al recuperar usuario!",
      text: error,
      icon: "error",
      confirmButtonText: "Ok",
    });
  }
};

/*------------FUNCIONES PARA POSTS-------------*/
export const submitPost = (post, loggedUser, setPosts) => {
  const postRef = doc(db, "posts", post.idPost);
  const userRef = doc(db, "users", loggedUser.idUser);

  setDoc(postRef, post)
    .then((res) => {
      updateDoc(userRef, {
        createdPosts: arrayUnion(post.idPost),
      });
    })
    .then((res) => {
      MySwal.fire({
        title: "¡Publicación exitosa!",
        text: "Tu publicación se ha creado correctamente!",
        icon: "success",
        confirmButtonText: "Ok",
      });
      getPosts(setPosts);
    })
    .catch((error) => {
      MySwal.fire({
        title: "¡Error crear tu publicación!",
        text: "No pudimos crear tu publicación, por favor intenta nuevamente:" + error,
        icon: "error",
        confirmButtonText: "Ok",
      });
    });
};

export const likePost = (idPost, idUser, isPostLiked, setIsPostLiked, numberOfLikes, setNumberOfLikes) => {
  const postRef = doc(db, "posts", idPost);
  const userRef = doc(db, "users", idUser);

  updateDoc(userRef, !isPostLiked ? { likedPosts: arrayUnion(idPost) } : { likedPosts: arrayRemove(idPost) })
    .then(updateDoc(postRef, !isPostLiked ? { likedBy: arrayUnion(idUser) } : { likedBy: arrayRemove(idUser) }))
    .then((res) => {
      !isPostLiked ? setNumberOfLikes(numberOfLikes + 1) : setNumberOfLikes(numberOfLikes - 1);
      setIsPostLiked(!isPostLiked);
    })
    .catch((error) =>
      MySwal.fire({
        title: "¡Error likeando publicación!",
        text: "No pudimos dar like a la publicación, por favor intenta nuevamente:" + error,
        icon: "error",
        confirmButtonText: "Ok",
      })
    );
};

export const deletePost = (idPost, idUser, postCreatorId, setPosts) => {
  const postRef = doc(db, "posts", idPost);
  const userRef = doc(db, "users", idUser);

  if (idUser === postCreatorId) {
    deleteDoc(postRef)
      .then((res) => {
        updateDoc(userRef, {
          createdPosts: arrayRemove(idPost),
        }).then((res) => {
          MySwal.fire("¡Publicación eliminada!", "La publicación ha sido eliminada correctamente.", "success");
          setPosts((prevPosts) => prevPosts.filter((post) => post.idPost !== idPost));
        });
      })
      .catch((error) => {
        MySwal.fire({
          title: "¡Error al eliminar la publicación!",
          text: "No pudimos eliminar la publicación, por favor intenta nuevamente:" + error,
          icon: "error",
          confirmButtonText: "Ok",
        });
      });
  }
};

// Profile edit functions.

export const editBio = (idUser, bio, setEditable) => {
  const userRef = doc(db, "users", idUser);

  updateDoc(userRef, {
    bio: bio,
  })
    .then(() => {
      MySwal.fire({
        title: "¡Bio editada!",
        text: "Tu bio ha sido editada correctamente!",
        icon: "success",
        confirmButtonText: "Ok",
      });
    }, setEditable(false))
    .catch((error) => {
      MySwal.fire({
        title: "¡Error al editar!",
        text: "No pudimos editar tu bio, por favor intenta nuevamente:" + error,
        icon: "error",
        confirmButtonText: "Ok",
      });
    });
};

export const updateProfilePicture = (idUser, profilePicture, setProfilePicURL, setProfilePicture) => {
  if (!profilePicture) {
    MySwal.fire({
      title: "¡Error!",
      text: "Por favor, elegí una imagen para subir",
      icon: "error",
      confirmButtonText: "Ok",
    });
  } else {
    const fileName = profilePicture.name.replace(/\s/g, "");
    const fullFileName = `${idUser}${fileName}`;

    const imageRef = ref(storage, `user-images/profile-pictures/${fullFileName}`);
    uploadBytes(imageRef, profilePicture)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      })
      .then((downloadURL) => {
        const userRef = doc(db, "users", idUser);
        updateDoc(userRef, {
          profilePicURL: downloadURL,
        });
        setProfilePicURL(downloadURL);
        MySwal.fire({
          title: "¡Imagen cargada!",
          text: "¡Tu imagen de perfil ha sido cargada correctamente!",
          icon: "success",
          confirmButtonText: "Ok",
        });
        setProfilePicture(null);
      })
      .catch((error) =>
        MySwal.fire({
          title: "¡Error al cargar tu imagen!",
          text: "No pudimos cargar tu imagen de perfil: " + error,
          icon: "error",
          confirmButtonText: "Ok",
        })
      );
  }
};
