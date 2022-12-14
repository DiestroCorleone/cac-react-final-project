# CoderConnect | La Red Social para Estudiantes de Programación!

### Trabajo final del curso de React de [Codo a Codo](https://www.buenosaires.gob.ar/educacion/codo-codo)

Este proyecto fue facilitado con [Create React App](https://github.com/facebook/create-react-app).

## Descripción

Red social que emplea [Firebase](https://firebase.google.com) en el backend, admite registro con e-mail y contraseña. Cuenta con un feed de posts, a los cuales puede dársele _like_ y mostrar un conteo de la cantidad.
También tenemos un perfil de usuario con un nombre y una sencilla bio.

[Demo app](https://react-dsce86.stackblitz.io)

## Dependencias

- [Firebase](npmjs.com/package/firebase)
- [nanoid](https://www.npmjs.com/package/nanoid)
- [SweetAlert2](https://sweetalert2.github.io/)

## To-do

- [x] Edición de bio.
- [x] Posibilidad de subir y modificar una imagen de perfil.
- [ ] Mantener sesión inciada.
- [ ] Eliminar post/usuario.
- [ ] Diseño de UX/UI e isotipo.
- [ ] Opciones de accesibilidad y SEO (texto alternativo, keywords, etc.).
- [ ] Archivos individuales para adapters de Firebase (hoy se encuentran todas en el archivo FirebaseAdapters.js).
- [ ] (No urgente) Comentarios sobre posts.

## Estructura de la carpeta _components_

- **CreateUser:** Nos permite ingresar un e-mail y una contraseña (que debemos confirmar). Se almacena en un estado, se valida, luego de lo cual se envía a Firebase para crear el usuario.
- **Login:** Formm de ingreso con usuario y constraseña, datos que se almacenan en un estado, sonb validados, y luego efectuamos la consulta a Firebase.
- **Feed:** Mediante un `useEffect`, trae todos los post y los almacena en un estado para luego ser renderizados.
- **NavBar:** Como su nombre lo indica, barra de navegación. Varía su contenido de acuerdo si al usuario se encuentra o no con sesión iniciada. Permite acceder a las distintas rutas, y cerrar sesión (si aplica).
- **User:** Nos muestra foto de perfil, e-mail y bio. Esta última puede editarse haciendo click en el ícono del lápiz. Si se elige esta opción, podemos editar la bio. Del mismo modo, podemos subir una imagen de perfil; cada una reemplazará a la anteriormente subida, almacenándose en la base de datos.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
