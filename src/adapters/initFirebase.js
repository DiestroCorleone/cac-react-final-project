// Imports que necesitaremos desde Firebase.
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// Configuración de aplicación de Firebse, similar a lo que hacemos en Sequelize.
const firebaseConfig = {
  apiKey: 'AIzaSyC0NwxgZZy2JTBN7wl0O0cLHZColb3OfGg',
  authDomain: 'cac-react-final-project.firebaseapp.com',
  projectId: 'cac-react-final-project',
  storageBucket: 'cac-react-final-project.appspot.com',
  messagingSenderId: '87179154853',
  appId: '1:87179154853:web:100b02b0bac9f5a26f044c',
};

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);

// Inicializamos Firestore, Storage y Authentication.
export const db = getFirestore(app);
export const storage = getStorage(app);
export const authentication = getAuth(app);
