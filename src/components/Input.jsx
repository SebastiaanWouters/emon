import React, { useEffect } from 'react'
import { PostButton } from './PostButton'
import { useContext, useState } from 'react'
import { chatContext } from '../contexts/useChatContext'

export const Input = () => {

  const { currentUserPubkey } = useContext(chatContext);
  const [chatMessage, setMessage] = useState("");

  const updateMessage = (e) => {
    setMessage(e.target.value);
  }

  useEffect(() => {
    setMessage("");
  }, [currentUserPubkey])

  return (
    <div className="inputComp">
        <input type="text" value={chatMessage} onChange={(e) => {updateMessage(e)}} placeholder="Type something..." />
        <div className="send">
            <PostButton message={chatMessage} resetMessage={setMessage} receiverpubkey={currentUserPubkey}></PostButton>
        </div>
    </div>
  )
}
