import { db, storage, authentication as auth } from './initFirebase';
import { collection, query, getDocs, getDoc, doc } from 'firebase/firestore';

// Query que indicará qué base de datos y colección consultar.
const postQuery = query(collection(db, 'posts'));

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
    console.log('Error: ' + e);
  }
};

// Traemos un usuario por ID.
export const getUser = (setLoggedUser, id) => {
  const userRef = doc(db, 'users', id); // Creamos una 'referencia', que se empleará en conjunto con getDoc().
  try {
    getDoc(userRef).then((res) => {
      // Traemos el documento en base a la referencia.
      setLoggedUser(res.data());
    });
  } catch (e) {
    console.log('Error: ' + e);
  }
};
