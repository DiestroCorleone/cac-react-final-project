import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <ul className="flex row justify-between">
        <Link to="/">
          <li>Login</li>
        </Link>
        <Link to="/create-user">
          <li>Crear usuario</li>
        </Link>
        <Link to="/feed">
          <li>Feed</li>
        </Link>
        <Link to="/user">
          <li>Usuario</li>
        </Link>
      </ul>
    </nav>
  );
}
