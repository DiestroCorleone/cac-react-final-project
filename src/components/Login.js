import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });

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
        />
        <br />
        <br />
        <input
          type="password"
          name="password"
          value={formData.password}
          placeholder="password"
          onChange={handleChange}
        />
        <br />
        <br />
        <button>ingresar</button>
      </form>
      <p>
        Aún no tenés una cuenta?
        <br />
        <Link to={"/login"}>
          {" "}
          <span className="underline cursor-pointer">Registrate ahora</span>
        </Link>
      </p>
    </section>
  );
}
