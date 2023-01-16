import React from 'react'
import { Message } from './Message'
import { userContext } from '../contexts/useUserContext';
import { chatContext } from '../contexts/useChatContext';
import { useContext, useState, useRef, useEffect, useReducer } from 'react';
import { useNostrEvents } from 'nostr-react';
import { uniqBy } from '../utils/util';
import { decryptMessage } from '../utils/utils';

export const Messages = () => {

  const { pubkey, username } = useContext(userContext);
  const { currentUserPubkey, sortedChatPartners, currentUserDecryptedChatData } = useContext(chatContext);
  

  return (
    <div className="messages">
        {
          currentUserDecryptedChatData.length > 0 && currentUserDecryptedChatData.map((message, index) => {
            const bool = message.tags[0][1] === pubkey && !(message.tags[0][1] === message.pubkey) ? false : true;
            return (<Message key={index} id={message.id} pk={message.pubkey === pubkey ? message.tags[0][1] : message.pubkey} timestamp={message.created_at} owner={bool} content={message.content}></Message>)
          })
        }
    </div>
  )
}
