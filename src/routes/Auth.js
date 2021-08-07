import React, {useState} from "react";
import authService from "fbase";

const Auth = () =>{ 
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [newAccount,setNewAccount] = useState(true);
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
        console.log(event.target.password);
        console.log(event.target.name);
        let data;
        try{
            if(newAccount){
                data = await authService.createUserWithEmailAndPassword(email,password);
            }else{
                data = await authService.signInWithEmailAndPassword(email,password);
            }
            console.log(data);
        }catch(error){
            console.log(error);
        }
    } 
    return <div>
    <form onSubmit={onSubmit}>
        <input name = "email" type="email" placeholder="Email" value={email} required   onChange = {onChange}/>
        <input name = "password" type="password" placeholder="password" value={password} required  onChange = {onChange}/>
        <input type="submit" value={newAccount ? "Create Account" : "Log in "}/> 
    </form>
    <div>
        <button>Continue with Google</button>
        <button>Continue with GitHub</button>
    </div>
</div>;
}
export default Auth;