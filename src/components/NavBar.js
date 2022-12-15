import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { signOutAccount } from "../adapters/FirebaseAdapters";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function NavBar() {
  const { isUserLogged, setIsUserLogged, setLoggedUser } =
    useContext(UserContext);

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
    <nav>
      <div className="nav-container">
        <ul>
          <li>
            <Link to="/feed" className="link">
              Feed
            </Link>
          </li>
          <li>
            <Link to="/user" className="link">
              Usuario
            </Link>
          </li>
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
            <p>Cerrar sesión</p>
          </li>
        </ul>
      </div>
    </nav>
  );
}
