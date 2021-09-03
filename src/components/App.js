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
        setUserObject(
           {
           displayName: user.displayName,
           uid: user.uid,
           updateProfile: (args) => user.updateProfile(args)
           }
        );
      }else{
        setIsLoggedIn(false);
        setUserObject(null);
      }
      setInit(true);
      refreshUser();
    });
  },[]);

  const refreshUser = () =>{
    const user = authService.currentUser;
    setUserObject({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args)
    });
  }
  return (
      <>
      {init? <AppRouter refreshUser = {refreshUser} isLoggedin={isLoggedin} userObj = {userObject}/> : "Initializing..."}
      <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
      </>

  );
}

export default App;
