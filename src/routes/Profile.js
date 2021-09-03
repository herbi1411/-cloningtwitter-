import React, { useEffect, useState } from "react"
import { authService, dbService } from "fbase";
import { useHistory } from "react-router-dom";

const Profile = ({userObj, refreshUser})=>{
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    useEffect(()=>{
        getMyNweets();
    },[]);
    const onChange = (event) => {
        const {target:{value}} = event;
        setNewDisplayName(value);
    }
    const getMyNweets = async() => {
        const nweets = await dbService.collection("nweets").where("creatorid","==",userObj.uid).orderBy("createdAt","asc").get();
        // console.log(nweets.docs.map((doc)=>doc.data()));
    }
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    }
    const onSubmit= async(event) =>{
        event.preventDefault();
        if(newDisplayName !== userObj.displayName){
            await  userObj.updateProfile({displayName:newDisplayName});
        }
        refreshUser();
    }
    return (
    <>
    <form onSubmit={onSubmit}>
        <input type="text" onChange = {onChange} value = {newDisplayName} placeholder="Display name"/>
        <input type="submit" value="Update profile"/>
    </form>
    <button onClick={onLogOutClick}>Log out</button>
    </>
    );
}
export default Profile;