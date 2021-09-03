import React, { useEffect } from "react"
import { authService, dbService } from "fbase";
import { useHistory } from "react-router-dom";

const Profile = ({userObj})=>{
    const history = useHistory();

    useEffect(()=>{
        getMyNweets();
    },[]);

    const getMyNweets = async() => {
        const nweets = await dbService.collection("nweets").where("creatorid","==",userObj.uid).orderBy("createdAt","asc").get();
        console.log(nweets.docs.map((doc)=>doc.data()));
    }
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    }
    return (
    <>
    <button onClick={onLogOutClick}>Log out</button>
    </>
    );
}
export default Profile;