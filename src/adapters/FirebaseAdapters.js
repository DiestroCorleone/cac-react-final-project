import { db, storage, authentication as auth } from "./initFirebase";
import {
  collection,
  query,
  getDocs,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

/*-------------REGISTRO Y LOGIN-------------*/
// Registro de usuario
export const createUser = (email, username, password, redirectToLogin) => {
  // Llamamos a la función para crear un usuario.
  createUserWithEmailAndPassword(auth, email, password).then(
    (userCredential) => {
      // Guardamos el ID de usuario devuelto en una variable.
      const user = userCredential.user;

      // Creamos un nuevo documento en la colección 'users' con los datos obtenidos.
      setDoc(doc(db, "users", user.uid), {
        idUser: user.uid,
        username: username,
        bio: "",
        likedPosts: [],
        createdPosts: [],
      })
        .then((res) => {
          alert("Usuario creado correctamente!");
          redirectToLogin();
        })
        .catch((error) => alert("Error creando usuario: " + error));
    }
  );
};

// Inicio de sesión
export const login = (
  email,
  password,
  setIsUserLogged,
  setLoggedUser,
  redirectAfterLogin
) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      if (user) {
        getUser(setLoggedUser, setIsUserLogged, user.uid, redirectAfterLogin);
      } else {
        alert("No se pudo iniciar sesión, por favor intentá nuevamente");
      }
    })
    .catch((error) => alert("Error iniciando sesión: " + error));
};

// Cerrar sesión
export const signOutAccount = (setIsUserLogged, setLoggedUser) => {
  signOut(auth)
    .then(() => {
      setIsUserLogged(false);
      setLoggedUser({});
      alert("Deslogueado correctamente.");
    })
    .catch((error) => alert("Error cerrando sesión: " + error));
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
  } catch (e) {
    console.log("Error: " + e);
  }
};

// Traemos un usuario por ID.
export const getUser = (
  setLoggedUser,
  setIsUserLogged,
  id,
  redirectAfterLogin
) => {
  const userRef = doc(db, "users", id); // Creamos una 'referencia', que se empleará en conjunto con getDoc().
  try {
    getDoc(userRef).then((res) => {
      // Traemos el documento en base a la referencia.
      setLoggedUser(res.data());
      setIsUserLogged(true);
      alert("Sesión iniciada correctamente!");
      redirectAfterLogin();
    });
  } catch (e) {
    console.log("Error: " + e);
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
      console.log("Post creado: " + res);
    })
    .then((res) => {
      alert("Post creado correctamente!");
      getPosts(setPosts);
    })
    .catch((error) =>
      alert("Error creando post, por favor intentá nuevamente")
    );
};
