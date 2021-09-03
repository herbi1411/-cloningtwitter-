import React, { useState } from "react";
import { authService } from "fbase";

const AuthForm = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [newAccount,setNewAccount] = useState(true);
    const [error,setError] = useState("");
    const onChange = (event) => {
        const {target: {name,value}} = event;
        if(name==="email"){
            setEmail(value)
        }else if(name==="password"){
            setPassword(value);
        }
    }
    const onSubmit = async(event) =>{
        event.preventDefault();
        try{
            if(newAccount){
                await authService.createUserWithEmailAndPassword(email,password);
            }else{
                await authService.signInWithEmailAndPassword(email,password);
            }
        }catch(error){
            console.log(error.message);
            setError(error.message);
        }
    } 

    const toggleAccount = () => setNewAccount((prev)=>!prev);
return (
    <>
    <form onSubmit={onSubmit} className="container">
        <input className = "authInput" name = "email" type="email" placeholder="Email" value={email} required   onChange = {onChange}/>
        <input className = "authInput" name = "password" type="password" placeholder="password" value={password} required  onChange = {onChange}/>
        <input className = "authInput authSubmit" type="submit" value={newAccount ? "Create Account" : "Log in "}/> 
        {error && <span className="authError">{error}</span>}
    </form>
    <span onClick={toggleAccount} className="authSwitch"> {newAccount ? "Sign in" : "Create Account"}</span>
    </>
    );
}

export default AuthForm;