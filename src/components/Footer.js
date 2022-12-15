import React from "react";

export default function Footer() {
  return (
    <footer className="pad-mid text-center back-black color-grey">
      <small>
        Desarrollado con ❤ por{" "}
        <a
          href="https://github.com/fmiguezo"
          title="GitHub Florencia Miguez Oliverio"
          target="_blank"
          rel="noreferrer"
        >
          Flor
        </a>
        ,{" "}
        <a
          href="https://github.com/michelettimatias"
          title="Matias Micheletti"
          target="_blank"
          rel="noreferrer"
        >
          Matt
        </a>{" "}
        y{" "}
        <a
          href="https://github.com/DiestroCorleone"
          title="GitHub Diestro Corleone"
          target="_blank"
          rel="noreferrer"
        >
          Diestro
        </a>
      </small>
    </footer>
  );
}
