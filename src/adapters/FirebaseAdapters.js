import { db, storage, authentication as auth } from "./initFirebase";
import {
  collection,
  query,
  getDocs,
  getDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

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
      })
        .then((res) => {
          alert("Usuario creado correctamente!");
          redirectToLogin();
        })
        .catch((error) => alert("Error creando usuario: " + error));
    }
  );
};

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
export const getUser = (setLoggedUser, id) => {
  const userRef = doc(db, "users", id); // Creamos una 'referencia', que se empleará en conjunto con getDoc().
  try {
    getDoc(userRef).then((res) => {
      // Traemos el documento en base a la referencia.
      setLoggedUser(res.data());
    });
  } catch (e) {
    console.log("Error: " + e);
  }
};
