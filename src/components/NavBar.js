import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { signOutAccount } from "../adapters/FirebaseAdapters";

export default function NavBar() {
  const { isUserLogged, setIsUserLogged, setLoggedUser } =
    useContext(UserContext);

  const navigate = useNavigate();
  const redirectAfterSignout = () => {
    navigate("/");
  };

  return (
    <nav>
      <ul className="flex row justify-between">
        {!isUserLogged ? (
          <>
            <Link to="/">
              <li>Login</li>
            </Link>
            <Link to="/create-user">
              <li>Crear usuario</li>
            </Link>
          </>
        ) : (
          <>
            <Link to="/feed">
              <li>Feed</li>
            </Link>
            <Link to="/user">
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
            >
              Cerrar sesión
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
