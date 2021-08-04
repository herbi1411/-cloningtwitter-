import React, {useState} from "react";

const Auth = () =>{ 
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const onChange = (event) => {
        const {target: {name,value}} = event;
        if(name==="email"){
            setEmail(value)
        }else if(name==="password"){
            setPassword(value);
        }
    }
    const onSubmit = (event) =>{
        event.preventDefault();
        console.log(event.target.password);
        console.log(event.target.name);
    } 
    return <div>
    <form onSubmit={onSubmit}>
        <input name = "email" type="text" placeholder="Email" value={email} required   onChange = {onChange}/>
        <input name = "password" type="password" placeholder="password" value={password} required  onChange = {onChange}/>
        <input type="submit" value="Log In"/> 
    </form>
    <div>
        <button>Continue with Google</button>
        <button>Continue with GitHub</button>
    </div>
</div>;
}
export default Auth;