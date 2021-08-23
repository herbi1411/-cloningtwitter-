import React, { useState, useEffect } from "react"
import { dbService, storageService } from "fbase";
import Nweet from "components/Nweet";
import {v4 as uuid4} from "uuid";
const Home = ({userObj})=> {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attatchment, setAttatchment] = useState("");
    
    // const getNweets = async() =>{
    //     const dbNweets = await dbService.collection("nweets").get(); 
    //     console.log(dbNweets);
    //     dbNweets.forEach(document => {
    //         const nweetObject = {
    //             ...document.data(),
    //             id: document.id
    //         };
    //         setNweets((prev) => [nweetObject, ...prev]);
    //     });

    // }

    useEffect(() => {
        // getNweets();
        dbService.collection("nweets").onSnapshot(snapshot => {
            const nweetArray = snapshot.docs.map(doc => ({id:doc.id, ...doc.data()}))
            setNweets(nweetArray);
        });
    }, []);

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

    return  <div>
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
    <div>
        {nweets.map( nweet => (
            <Nweet key = {nweet.id} nweetObj = {nweet} isOwner = {nweet.creatorId === userObj.uid}/>
        ))}
    </div>
</div>
}

export default Home;
