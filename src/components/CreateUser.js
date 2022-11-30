import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../adapters/FirebaseAdapters";

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
    console.log(formData);
  };

  const validateUserAndPass = (event) => {
    event.preventDefault();
    if (
      formData.username.length < 6 ||
      formData.password.length < 6 ||
      formData.repeatPassword < 6
    ) {
      alert("El usuario y/o contraseña deben tener al menos 6 caracteres.");
      return;
    }

    if (formData.password !== formData.repeatPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    createUser(
      formData.email,
      formData.username,
      formData.password,
      redirectToLogin
    );
  };

  return (
    <section>
      <form onSubmit={validateUserAndPass}>
        <h1>Crear usuario</h1>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Tu nombre de usuario..."
          required
        />
        <br />
        <br />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="nombre@email.com"
          required
        />
        <br />
        <br />
        <input
          type="password"
          name="password"
          value={formData.password}
          placeholder="Contraseña (al menos 6 caracteres)"
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <input
          type="password"
          name="repeatPassword"
          value={formData.repeatPassword}
          placeholder="Repetir contraseña"
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <input type="submit" value="Registrate" />
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
