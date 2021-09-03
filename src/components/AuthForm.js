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
    <form onSubmit={onSubmit}>
        <input name = "email" type="email" placeholder="Email" value={email} required   onChange = {onChange}/>
        <input name = "password" type="password" placeholder="password" value={password} required  onChange = {onChange}/>
        <input type="submit" value={newAccount ? "Create Account" : "Log in "}/> 
        {error}
    </form>
    <span onClick={toggleAccount}> {newAccount ? "Sign in" : "Create Account"}</span>
    </>
    );
}

export default AuthForm;