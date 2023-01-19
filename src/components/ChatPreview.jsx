import React, { useEffect } from 'react'
import User from '../img/user.png'
import { chatContext } from '../contexts/useChatContext';
import { userContext } from '../contexts/useUserContext';
import { useContext, useState } from 'react';
import { useNostrEvents, useProfile } from "nostr-react";

export const ChatPreview = ({chatuserpubkey, active}) => {
    const { pubkey } = useContext(userContext);
    const { setCurrentUserPubkey, setCurrentUserPicture, setCurrentUserName, userNotifications} = useContext(chatContext);
    const [previewUserName, setPreviewUserName] = useState("");
    const [previewUserPicture, setPreviewUserPicture] = useState(User);
    const activeClass = active ? "active shadow-xl" : "shadow";
    const [newMessageClass, setNewMessageClass] = useState("");

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
      } else {
        setPreviewUserName(`E${chatuserpubkey.slice(0,5)}`);
        setPreviewUserPicture(`https://api.dicebear.com/5.x/avataaars/png?seed=${chatuserpubkey.slice(0,5)}`);
      }
    }, [userData])

    useEffect(() => {
      if (userNotifications[chatuserpubkey]) {
        console.log("showing notification");
        setNewMessageClass("active");
      } else {
        setNewMessageClass("");
      }
    }, [userNotifications])


    return (
        <div onClick={updateChatContext} className={`userChat ${activeClass}`}>
            <img src={previewUserPicture} alt="" />
            <div className="userChatInfo">
                <span className=''>{previewUserName}</span>
                {<div className={`notification-indicator ${newMessageClass}`}></div>}
              
            </div>
        </div>
    )
}
