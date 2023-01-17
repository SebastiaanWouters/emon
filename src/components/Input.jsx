import React, { useEffect } from 'react'
import { PostButton } from './PostButton'
import { useContext, useState } from 'react'
import { chatContext } from '../contexts/useChatContext'
import { userContext } from '../contexts/useUserContext'
import { dateToUnix, useNostr } from 'nostr-react'
import { getEventHash } from 'nostr-tools'


export const Input = () => {

  const { publish } = useNostr();
  const { pubkey } = useContext(userContext);
  const { currentUserPubkey } = useContext(chatContext);
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
      publishEvent();
    }
      
  }

  const publishEvent = async () => {
    let enc = await window.nostr.nip04.encrypt(currentUserPubkey, chatMessage);
    
    const event = {
      "content": enc,
      "kind": 4,
      "tags": [['p', currentUserPubkey]],
      "created_at": dateToUnix(),
      "pubkey": pubkey,
    };
    
    console.log(event);
    event.id = getEventHash(event);
    const signedEvent = await window.nostr.signEvent(event);
    setMessage("");
    return publish(signedEvent);
};


  return (
    <div className="inputComp">
        <input type="text" value={chatMessage} onKeyDown={handleKeyDown} onChange={(e) => {updateMessage(e)}} placeholder="Say Hi..." />
        <div className="send">
            <PostButton sendMessage={sendMessage}></PostButton>
        </div>
    </div>
  )
}
