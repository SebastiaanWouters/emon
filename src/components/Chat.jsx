import React from 'react'
import Cam from '../img/cam.png'
import Add from '../img/add.png'
import More from '../img/more.png'
import { Messages } from './Messages'
import { Input } from './Input'
import { chatContext } from '../contexts/useChatContext';
import { userContext } from '../contexts/useUserContext';
import { useContext, useState } from 'react';
import { useNostrEvents, useProfile } from 'nostr-react'

export const Chat = () => {
  const { currentUserPubkey, currentUserName, currentUserPicture } = useContext(chatContext);
  
  return (
    <div className='chatComp'>
      <div className="chatInfo">
        <span>{currentUserName}</span>
        <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      {currentUserPubkey !== "" && <Messages></Messages>}
      {currentUserPubkey !== "" && <Input></Input>}
    </div>
  )
}
