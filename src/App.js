import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import Login from "./components/Login";
import CreateUser from "./components/CreateUser";
import NavBar from "./components/NavBar";
import Feed from "./components/Feed";
import User from "./components/User";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer";

import logo from "../src/images/coder-logo.svg";

export default function App() {
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [loggedUser, setLoggedUser] = useState({});
  const [posts, setPosts] = useState([]);

  return (
    <UserContext.Provider
      value={{
        isUserLogged,
        setIsUserLogged,
        loggedUser,
        setLoggedUser,
        posts,
        setPosts,
      }}
    >
      <div className="header">
        <header className="header-cont">
          <h1 className="logo">
            <img src={logo} alt="Coder Connect" />{" "}
          </h1>
          <h2>La Red Social para Estudiantes de Programación!</h2>
          <br />
        </header>
      </div>
      {isUserLogged ? (
        <BrowserRouter>
          <NavBar />
          <section className="body">
            <div className="body-container">
              <Routes>
                <Route path="/feed" element={<Feed />} />
                <Route
                  path="/user"
                  element={<User loggedUser={loggedUser} posts={posts} />}
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </section>
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <section className="body">
            <div className="body-container">
              <Routes>
                <Route exact path="/" element={<Login />} />
                <Route path="/create-user" element={<CreateUser />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </section>
        </BrowserRouter>
      )}
      <Footer />
    </UserContext.Provider>
  );
}
