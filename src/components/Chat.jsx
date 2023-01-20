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
import { InvoiceCreator } from './InvoiceCreator'

export const Chat = () => {
  const { currentUserPubkey, currentUserName, currentUserPicture } = useContext(chatContext);
  const [invoiceActive, setInvoiceActive] = useState(false)

  function showInvoice() {

    setInvoiceActive(true);
  }
  function hideInvoice() {
    setInvoiceActive(false);
  }
  
  return (
    <div className='chatComp'>
      <div className="chatInfo">
        {currentUserPubkey !== '' && <><span>{currentUserName}</span>
        <div className="chatIcons">
            <button onClick={showInvoice} className="lnbtn">⚡</button>
        </div></>}
      </div>
      {invoiceActive && <InvoiceCreator hide={hideInvoice}></InvoiceCreator>}
      {currentUserPubkey !== "" && <Messages></Messages>}
      {currentUserPubkey !== "" && <Input></Input>}
    </div>
  )
}
