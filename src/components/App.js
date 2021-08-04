import React, {useState} from "react"
import AppRouter from "./Router"
import {authService} from "fbase";
function App() {
//  console.log(authService.currentUser);
  const [isLoggedin, setIsLoggedIn] = useState(false);
  return (
      <>
      <AppRouter isLoggedin={isLoggedin}/>
      <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
      </>

  );
}

export default App;
