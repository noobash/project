import React, { useState, useEffect } from "react";
import fire, { db } from "./fire";
import Login from "./Login";
import SearchComponent from "./components/SearchComponent";
import "./App.css";
import PatientInfo from "./components/PatientInfoComponent";
import { ChakraProvider } from "@chakra-ui/react";

export const API_KEY = "a9118a3a";
const Route = ({ path, children }) => {
  console.log(
    window.location.pathname,
    path,
    window.location.pathname.includes(path)
  );
  if (path === "/") {
    return window.location.pathname === path ? children : null;
  }
  return window.location.pathname.includes(path) ? children : null;
};

function App() {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const clearErrors = () => {
    setError("");
  };

  const handleLogin = () => {
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setError("Username or Password is invalid");
            break;
          case "auth/wrong-password":
            setError("Username or Password is invalid");
            break;
        }
      });
    console.log(user);
  };

  const handleLogout = () => {
    fire.auth().signOut();
  };

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        setUser(user);
      } else {
        setUser("");
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  return (
    <ChakraProvider>
      <div className="App">
        <Route path="/">
          {user ? (
            <SearchComponent handleLogout={handleLogout}></SearchComponent>
          ) : (
            <Login
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              handleLogin={handleLogin}
              error={error}
            />
          )}
        </Route>
        <Route path="/patient">
          <PatientInfo
            name={"amit"}
            id={"some"}
            age={"12"}
            gender={"female"}
            bloodGroup={"0ve"}
            weight={12}
            diagonosis={""}
          />
        </Route>
      </div>
    </ChakraProvider>
  );
}

export default App;
