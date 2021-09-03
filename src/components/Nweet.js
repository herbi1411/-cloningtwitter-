import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Nweet = ({nweetObj, isOwner}) =>{

    const [Editing,setEditing] = useState(false);
    const [newNweet,setNewNweet] = useState(nweetObj.text);

    const onDeleteClick = async (event) => {
        const ok = window.confirm("Are you sure want to Delete this tweet??");
        if(ok){
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
            await storageService.refFromURL(nweetObj.attatchmentUrl).delete();
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
    return <div className="nweet">{
            Editing ? (
                <>
                <form onSubmit={onSubmit} className="container nweetEdit">
                    <input type = "text" placeholder = "Edit your tweet" value = {newNweet} onChange = {onChange} required autoFocus className = "formInput"/>
                    <input type="submit" value="Update Nweet" className="formBtn" />
                </form> 
                <span onClick={toggleEditing} className="formBtn cancelBtn">
                    Cancel
                </span>
                </>

            ) : (
                <>
                 <h4>{nweetObj.text}</h4>
                 {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl}  />}
        {isOwner && (
                <div className="nweet__actions">
                    <span onClick={onDeleteClick}>
                        <FontAwesomeIcon icon={faTrash} />
                    </span>
                    <span onClick={toggleEditing}>
                        <FontAwesomeIcon icon={faPencilAlt} />
                    </span>
                </div>
                )}  
                </>

            )
        
        }
       
    </div>
};

export default Nweet;