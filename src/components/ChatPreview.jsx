import React, { useEffect } from 'react'
import User from '../img/user.png'
import { chatContext } from '../contexts/useChatContext';
import { userContext } from '../contexts/useUserContext';
import { useContext, useState } from 'react';
import { useNostrEvents, useProfile } from "nostr-react";

export const ChatPreview = ({chatuserpubkey, active}) => {
    const { pubkey } = useContext(userContext);
    const { setCurrentUserPubkey, setCurrentUserPicture, setCurrentUserName} = useContext(chatContext);
    const [previewUserName, setPreviewUserName] = useState("");
    const [previewUserPicture, setPreviewUserPicture] = useState(User);
    const activeClass = active ? "active shadow-xl" : "shadow";

    const updateChatContext = () => {
        setCurrentUserPubkey(chatuserpubkey);
        setCurrentUserPicture(previewUserPicture);
        setCurrentUserName(previewUserName),
        console.log("updating chat context");
    }


     const { onEvent: onNewUser } = useNostrEvents({
      filter: {
        kinds: [0],
        authors: [chatuserpubkey],
      },
    })


    onNewUser((metaData) => {
      const user = JSON.parse(metaData.content);
      setPreviewUserName(user.name ? user.name : `user${chatuserpubkey.slice(0,5)}`);
      try {
        setPreviewUserPicture(user.picture ? encodeURI(user.picture) : User);
    } catch {
        setPreviewUserPicture(User);
    }
    })

    return (
        <button onClick={updateChatContext} className={`userChat ${activeClass}`}>
            <img src={previewUserPicture} alt="" />
            <div className="userChatInfo">
            <span className=''>{previewUserName}</span>
            {/*<p>{"Yo"}</p>*/}
            </div>
        </button>
    )
}
