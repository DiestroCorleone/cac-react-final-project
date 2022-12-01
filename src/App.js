import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { getUser } from "./adapters/FirebaseAdapters";
import { UserContext } from './context/UserContext';
import Login from './components/Login';
import CreateUser from './components/CreateUser';
import NavBar from './components/NavBar';
import Feed from './components/Feed';
import User from './components/User';
import NotFound from './components/NotFound';

export default function App() {
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [loggedUser, setLoggedUser] = useState({});

  return (
    <UserContext.Provider
      value={{ isUserLogged, setIsUserLogged, loggedUser, setLoggedUser }}
    >
      <div className="pad-mid">
        <h1>CoderConnect</h1>
        <h3>La Red Social para Estudiantes de Programación!</h3>
        <BrowserRouter>
          <NavBar />
          <Routes>
            {isUserLogged ? (
              <>
                <Route path="/feed" element={<Feed />} />
                <Route
                  path="/user"
                  element={<User loggedUser={loggedUser} />}
                />
              </>
            ) : (
              <>
                <Route exact path="/" element={<Login />} />
                <Route path="/create-user" element={<CreateUser />} />
              </>
            )}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}
