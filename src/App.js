import React,{useState,useEffect} from "react";
import fire ,{db} from './fire';
import Login from "./Login";
import SearchComponent from "./components/SearchComponent";
import './App.css'

export const API_KEY = "a9118a3a";

function App() {
const [user,setUser] = useState('');
const[email,setEmail] = useState('');
const[password,setPassword] = useState('');
const[error,setError] = useState('');

const clearInputs = () => {
  setEmail('');
  setPassword('');
}

const clearErrors = () => {
  setError('');
}

const handleLogin = () => {
  clearErrors();
fire
  .auth()
  .signInWithEmailAndPassword(email,password)
  .catch(err =>{
  switch(err.code){
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
}
/*
const handleSignup = () => {
  clearErrors();
  fire
    .auth()
    .createUserWithEmailAndPassword(email,password)
    .catch(err =>{
    switch(err.code){
    case "auth/email-already-in-use":
    case "auth/invalid-email":
      setEmailError(err.message);
      break;
    case "auth/weak-password":
      setPasswordError(err.message);
      break;
    }
    });
  
  } */

  const handleLogout = () => {
    fire.auth().signOut();
  }

  const authListener = () => {
    fire.auth().onAuthStateChanged(user => {
      if(user){
        clearInputs();
        setUser(user);
      }
      else{
        setUser('');
      }
    })
  }

  useEffect(()=>{
    authListener();
  },[])

  return (
    <div className="App">
      {
        user?(
          <SearchComponent handleLogout = {handleLogout}></SearchComponent>
        ):(
          <Login 
    email ={email} 
    setEmail ={setEmail} 
    password ={password} 
    setPassword={setPassword} 
    handleLogin = {handleLogin} 
    error = {error}
    />
        )
      }
    </div>
  )
}

export default App;
