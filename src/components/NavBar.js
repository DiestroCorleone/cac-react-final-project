import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { signOutAccount } from "../adapters/FirebaseAdapters";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function NavBar() {
  const { isUserLogged, setIsUserLogged, setLoggedUser } = useContext(UserContext);

  const navigate = useNavigate();
  const redirectAfterSignout = () => {
    navigate("/");
  };

  const confirmSignOut = () => {
    MySwal.fire({
      title: "Estás por cerrar tu sesión.",
      text: "¿Seguro querés desloguearte?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, quiero cerrar sesión.",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        signOutAccount(setIsUserLogged, setLoggedUser, redirectAfterSignout);
      }
    });
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
            <li onClick={() => confirmSignOut()} className="link">
              Cerrar sesión
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
