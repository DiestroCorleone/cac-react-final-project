import React, { useState } from 'react';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    repeatPassword: '',
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
    <form>
      <h1>Crear usuario</h1>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Tu nombre de usuario..."
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        placeholder="password"
        onChange={handleChange}
      />
      <input
        type="repeatPassword"
        name="repeatPassword"
        value={formData.password}
        placeholder="password"
        onChange={handleChange}
      />
      <button>ingresar</button>
    </form>
  );
}
