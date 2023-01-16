import React, { useEffect, useState } from 'react'
import User from '../img/user.png'
import { userContext } from '../contexts/useUserContext';
import { chatContext } from '../contexts/useChatContext';
import { useContext } from 'react';
import { useProfile } from "nostr-react";
import { ChatPreview } from './ChatPreview';
import { useRef } from "react";
import { useNostrEvents, dateToUnix } from "nostr-react";

export const Chats = () => {
  const {pubkey, setPubkey} = useContext(userContext);
  const { sortedChatPartners, currentUserPubkey } = useContext(chatContext);

  return (
    <div className="chats">
    {sortedChatPartners.map((partner, index) => {
      return (
        <ChatPreview key={index} active={partner.pubkey === currentUserPubkey}  chatuserpubkey={partner.pubkey}></ChatPreview>
      )
    })

    }
    </div>
  )
}
