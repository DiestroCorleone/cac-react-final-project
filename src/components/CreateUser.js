import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../adapters/FirebaseAdapters";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function CreateUser(props) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const navigate = useNavigate();

  const redirectToLogin = () => {
    navigate("/");
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
    if (formData.username.length < 6 || formData.password.length < 6 || formData.repeatPassword < 6) {
      MySwal.fire({
        title: "¡Error al crear tu usuario!",
        text: "El usuario y/o contraseña deben tener al menos 6 caracteres.",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    if (formData.password !== formData.repeatPassword) {
      MySwal.fire({
        title: "¡Error al crear tu usuario!",
        text: "Las contraseñas no coinciden",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    createUser(formData.email, formData.username, formData.password, redirectToLogin);
  };

  return (
    <section className="card login">
      <form onSubmit={validateUserAndPass}>
        <h3>Crear usuario</h3>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Tu nombre de usuario..."
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="nombre@email.com"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          placeholder="Contraseña (al menos 6 caracteres)"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="repeatPassword"
          value={formData.repeatPassword}
          placeholder="Repetir contraseña"
          onChange={handleChange}
          required
        />
        <input type="submit" value="Registrate" className="button" />
      </form>
      <p>
        Ya tenés una cuenta?
        <br />
        <Link to={"/"}>
          <span className="underline cursor-pointer">Iniciar sesión</span>
        </Link>
      </p>
    </section>
  );
}
