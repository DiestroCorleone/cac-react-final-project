import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { signOutAccount } from '../adapters/FirebaseAdapters';

export default function NavBar() {
  const { isUserLogged, setIsUserLogged, setLoggedUser } =
    useContext(UserContext);

  const navigate = useNavigate();
  const redirectAfterSignout = () => {
    navigate('/');
  };

  return (
    <nav className="pad-small back-black">
      <ul className="flex row justify-between">
        {!isUserLogged ? (
          <>
            <Link to="/" className="link">
              <li>Login</li>
            </Link>
            <Link to="/create-user" className="link">
              <li>Crear usuario</li>
            </Link>
          </>
        ) : (
          <>
            <Link to="/feed" className="link">
              <li>Feed</li>
            </Link>
            <Link to="/user" className="link">
              <li>Usuario</li>
            </Link>
            <li
              onClick={() =>
                signOutAccount(
                  setIsUserLogged,
                  setLoggedUser,
                  redirectAfterSignout
                )
              }
              className="link"
            >
              Cerrar sesión
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
