import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { login } from '../adapters/FirebaseAdapters';

export default function Login() {
  const { setIsUserLogged, setLoggedUser } = useContext(UserContext);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const redirectAfterLogin = () => {
    navigate('/feed');
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
    if (formData.email.length < 6 || formData.password.length < 6) {
      alert('El usuario y/o contraseña deben tener al menos 6 caracteres.');
      return;
    }

    login(
      formData.email,
      formData.password,
      setIsUserLogged,
      setLoggedUser,
      redirectAfterLogin
    );
  };

  return (
    <section>
      <form onSubmit={validateUserAndPass}>
        <h1>Iniciar sesión</h1>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="name@email.com"
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
        <input type="submit" value="Ingresar" />
      </form>
      <p>
        Aún no tenés una cuenta?
        <br />
        <Link to={'/create-user'}>
          {' '}
          <span className="underline cursor-pointer">Registrate ahora</span>
        </Link>
      </p>
    </section>
  );
}
