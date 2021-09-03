import React, { useState } from "react"
import { dbService, storageService } from "fbase";
import {v4 as uuid4} from "uuid";

const NweetFactory = ({userObj}) =>{
    
    const [nweet, setNweet] = useState("");
    const [attatchment, setAttatchment] = useState("");

    const onSubmit = async (event) =>{
        event.preventDefault();
        let attatchmentUrl = "";
        if(attatchment !== ""){
            const attatchmentRef = storageService.ref().child(`${userObj.uid}/${uuid4()}`);
            const response = await attatchmentRef.putString(attatchment,"data_url");
            attatchmentUrl = await response.ref.getDownloadURL();
        }

        await dbService.collection("nweets").add({
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attatchmentUrl
        });
        
        setNweet("");
        setAttatchment("");
        
    }

    const onChange = (event) => {
        const {target: {value}} = event;
        setNweet(value);
    }
    const onFileChange = (event) => {
        const {target:{files}} = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {currentTarget: {result}} = finishedEvent;
            setAttatchment(result);
        }
        reader.readAsDataURL(theFile);

    }

    const onClearAttatchmentClick = () => setAttatchment(null);

    return (
        <form onSubmit = {onSubmit}> 
        <input type="text" value={nweet} placeholder="What's on your mind?" maxLength ={120} onChange = {onChange}/>
        <input type="file" accept="image/*" onChange = {onFileChange}/>
        <input type="submit" value="Nweet"/>
        {attatchment && 
        <div>
            <img src={attatchment} width="50px" height="50px" alt="your img"/>
            <button onClick = {onClearAttatchmentClick}>Clear</button>
        </div>}
    </form>
    )
}

export default NweetFactory;