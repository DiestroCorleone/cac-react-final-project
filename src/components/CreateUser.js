import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function CreateUser(props) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    repeatPassword: "",
  });

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

  return (
    <section>
      <form>
        <h1>Iniciar sesión</h1>
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
        <button>Registrate</button>
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
