import React, { useEffect } from 'react'
import User from '../img/user.png'
import { userContext } from '../contexts/useUserContext';
import { chatContext } from '../contexts/useChatContext';
import { useContext, useState } from 'react';
import { useProfile } from 'nostr-react';
import { decryptMessage } from '../utils/utils';
import { MessageContent } from './MessageContent';


export const Message = ({owner, content}) => {
  const { pubkey, picture } = useContext(userContext);
  const { currentUserPubkey, currentUserName, currentUserPicture } = useContext(chatContext);
  const messageClass = owner ? "m-2 chat chat-start owner" : "m-2 chat chat-end";
  const textClass = owner ? "chat-bubble text-base break-word owner p-2.5 shadow-xl" : "chat-bubble break-word text-base p-2.5 shadow-xl";
  

  return (
    <div className={messageClass}>
    <div className="w-11 chat-image avatar">
      <div className="rounded-full">
        <img src={owner ? picture : currentUserPicture} />
      </div>
    </div>
      <div className={textClass}><MessageContent msg={content}></MessageContent></div>
    </div>

  )
}
