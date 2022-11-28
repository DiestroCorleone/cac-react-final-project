import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getUser } from "./adapters/FirebaseAdapters";
import Login from "./components/Login";
import CreateUser from "./components/CreateUser";
import NavBar from "./components/NavBar";
import Feed from "./components/Feed";
import User from "./components/User";

export default function App() {
  const [loggedUser, setLoggedUser] = useState({});

  useEffect(() => {
    getUser(setLoggedUser, "testUser");
  }, []);

  return (
    <div className="pad-mid">
      <h1>CaC Connect</h1>
      <h3>La Red Social para Estudiantes de Programación!</h3>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/user" element={<User loggedUser={loggedUser} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
