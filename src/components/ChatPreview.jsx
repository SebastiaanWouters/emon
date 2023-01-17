import React, { useEffect } from 'react'
import User from '../img/user.png'
import { chatContext } from '../contexts/useChatContext';
import { userContext } from '../contexts/useUserContext';
import { useContext, useState } from 'react';
import { useNostrEvents, useProfile } from "nostr-react";

export const ChatPreview = ({chatuserpubkey, active}) => {
    const { pubkey } = useContext(userContext);
    const { setCurrentUserPubkey, setCurrentUserPicture, setCurrentUserName} = useContext(chatContext);
    const [previewUserName, setPreviewUserName] = useState(`E${chatuserpubkey.slice(0,5)}`);
    const [previewUserPicture, setPreviewUserPicture] = useState(`https://api.dicebear.com/5.x/avataaars/png?seed=${chatuserpubkey.slice(0,5)}`);
    const activeClass = active ? "active shadow-xl" : "shadow";

    const updateChatContext = () => {
        setCurrentUserPubkey(chatuserpubkey);
        setCurrentUserPicture(previewUserPicture);
        setCurrentUserName(previewUserName),
        console.log("updating chat context");
    }


    const { data: userData } = useProfile({
      pubkey: chatuserpubkey
    })

    useEffect(() => {
      if (userData) {
        setPreviewUserName(userData.name ? userData.name : `E${chatuserpubkey.slice(0,5)}`);
        try {
          setPreviewUserPicture(userData.picture ? encodeURI(userData.picture) : `https://api.dicebear.com/5.x/avataaars/png?seed=${chatuserpubkey.slice(0,5)}`);
          
        } catch {
          console.log("malformed uri");
          setPreviewUserPicture(`https://api.dicebear.com/5.x/avataaars/png?seed=${chatuserpubkey.slice(0,5)}`);
        }
      }
    }, [userData])


    /*onNewUser((metaData) => {
      const user = JSON.parse(metaData.content);
      setPreviewUserName(user.name ? user.name : `E${chatuserpubkey.slice(0,5)}`);
      try {
        setPreviewUserPicture(user.picture ? encodeURI(user.picture) : `https://avatars.dicebear.com/v2/avataaars/${chatuserpubkey.slice(0,5)}.svg`);
    } catch {
        setPreviewUserPicture(`https://avatars.dicebear.com/v2/avataaars/${chatuserpubkey.slice(0,5)}.svg`);
    }
    })*/

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
