import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { login } from "../adapters/FirebaseAdapters";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function Login() {
  const { setIsUserLogged, setLoggedUser } = useContext(UserContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const redirectAfterLogin = () => {
    navigate("/feed");
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const validateUserAndPass = (event) => {
    event.preventDefault();
    if (formData.email.length < 6 || formData.password.length < 6) {
      MySwal.fire({
        title: "¡Error al crear tu usuario!",
        text: "El usuario y/o contraseña deben tener al menos 6 caracteres.",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    login(formData.email, formData.password, setIsUserLogged, setLoggedUser, redirectAfterLogin);
  };

  return (
    <section className="card login">
      <form onSubmit={validateUserAndPass}>
        <h3>Iniciar sesión</h3>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="name@email.com"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          placeholder="password"
          onChange={handleChange}
          required
        />
        <input type="submit" value="Ingresar" className="button" />
      </form>
      <p>
        Aún no tenés una cuenta?
        <Link to={"/create-user"}>
          {" "}
          <span className="underline cursor-pointer">Registrate ahora</span>
        </Link>
      </p>
    </section>
  );
}
