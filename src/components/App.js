import React, {useState, useEffect} from "react"
import AppRouter from "./Router"
import {authService} from "fbase";
function App() {
  const[init, setInit] = useState(false);
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const [userObject,setUserObject] = useState(null);
    useEffect(()=>{
    authService.onAuthStateChanged((user)=>{
      if(user){
        setIsLoggedIn(true);
        setUserObject(user);
      }else{
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  });

  return (
      <>
      {init? <AppRouter isLoggedin={isLoggedin} userObj = {userObject}/> : "Initializing..."}
      <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
      </>

  );
}

export default App;
