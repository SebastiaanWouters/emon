import React, { useEffect } from 'react'
import { PostButton } from './PostButton'
import { useContext, useState } from 'react'
import { chatContext } from '../contexts/useChatContext'
import { userContext } from '../contexts/useUserContext'
import { getEventHash } from 'nostr-tools'


export const Input = () => {

  
  const { pubkey } = useContext(userContext);
  const { currentUserPubkey, publishEvent } = useContext(chatContext);
  const [chatMessage, setMessage] = useState("");

  const updateMessage = (e) => {
    setMessage(e.target.value);
  }

  useEffect(() => {
    setMessage("");
  }, [currentUserPubkey])

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  }

  const sendMessage = async () => {
    if (chatMessage !== "") {
      publishEvent(chatMessage);
    }
      
  }


  return (
    <div className="inputComp">
        <input type="text" value={chatMessage} onKeyDown={handleKeyDown} onChange={(e) => {updateMessage(e)}} placeholder="Say Hi..." />
        <div className="send">
            <PostButton sendMessage={sendMessage}></PostButton>
        </div>
    </div>
  )
}
