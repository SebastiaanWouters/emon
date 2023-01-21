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
import toast, { Toaster, ToastBar } from 'react-hot-toast';

export const Chat = () => {
  const { currentUserPubkey, currentUserName, currentUserPicture } = useContext(chatContext);
  const [invoiceActive, setInvoiceActive] = useState(false)
  const noExt = () => toast(
    (t) => (
    <span>
        <button className="hover:text-purple-900" onClick={() => toast.dismiss(t.id)}><a href="https://getalby.com" target="_blank">You need a lightning enabled browser extension to send and receive sats, click here to learn more</a></button>
    </span>
    ),
    {
    duration: 12000,
    icon: null,
    },
);


  function showInvoice() {
    if(typeof window.webln === 'undefined') { 
      noExt()
    } else {
      setInvoiceActive(true);
    }
  }
  function hideInvoice() {
    setInvoiceActive(false);
  }
  
  return (
    <>
    <Toaster>
    {(t) => (
      <ToastBar
        toast={t}
        style={{
          ...t.style,
          animation: t.visible ? 'slide-in-top 1s ease' : 'slide-out-top 1s ease',
          minWidth: "40rem",
        }}
      />
    )}
    </Toaster>
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
    </>
  )
}
