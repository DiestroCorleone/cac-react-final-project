import React from "react";
import { Link } from "react-router-dom";
import profilePicURL from "../images/coder-logo.svg"

export default function NotFound() {
  return ( 
    <div className="width-responsive pad-mid">
      <h1>Error 404!</h1>
      <p>La página que buscás no existe o no está disponible.</p>
      <br />
      <Link to="/">
        <button className="pad-mid back-black color-grey">Volver a inicio</button>
      </Link>
    </div>
  );
}
