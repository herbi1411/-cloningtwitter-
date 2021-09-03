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
    <div className="container">\
     <form onSubmit={onSubmit} className="profileForm">
        <input
          onChange={onChange}
          type="text"
          autoFocus
          placeholder="Display name"
          value={newDisplayName}
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
    </form>
    <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
    );
}
export default Profile;