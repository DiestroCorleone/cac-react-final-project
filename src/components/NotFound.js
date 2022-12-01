import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="width-responsive">
      <h1>Error 404!</h1>
      <p>La página que buscás no existe o no está disponible.</p>
      <Link to="/">
        <button>Volver a inicio</button>
      </Link>
    </div>
  );
}
