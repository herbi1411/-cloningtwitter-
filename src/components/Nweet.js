import React, { useState } from "react";
import { dbService } from "fbase";

const Nweet = ({nweetObj, isOwner}) =>{

    const [Editing,setEditing] = useState(false);
    const [newNweet,setNewNweet] = useState(nweetObj.text);

    const onDeleteClick = async (event) => {
        const ok = window.confirm("Are you sure want to Delete this tweet??");
        if(ok){
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
        }else{

        }
    }
    const onSubmit = (event) => {
        event.preventDefault();
        dbService.doc(`nweets/${nweetObj.id}`).update({
            text: newNweet,
            ModifiedAt: Date.now(),
        });
        setEditing(false); 
    }
    const onChange = (event) => {
        const {target: {value}} = event
        setNewNweet(value);
    }
    const toggleEditing = () => setEditing(prev => !prev);
    return <div>{
            Editing ? (
                <>
                <form onSubmit = {onSubmit}>
                    <input type = "text" placeholder = "Edit your tweet" value = {newNweet} onChange = {onChange} required/>
                    <input type = "submit" value = "Update Tweet"/>
                </form> 
                <button onClick = {toggleEditing}>Cancel</button>
                </>

            ) : (
                <>
                 <h4>{nweetObj.text}</h4>
        {isOwner && (
                <>
                <button onClick = {onDeleteClick}>Delete Nweet</button>
                <button onClick = {toggleEditing}>Edit Nweet</button>
                </>
                )}  
                </>

            )
        
        }
       
    </div>
};

export default Nweet;