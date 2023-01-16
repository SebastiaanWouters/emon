import { useNostr, dateToUnix } from "nostr-react";
import { useState } from "react";
import { useContext } from "react";
import { userContext } from "../contexts/useUserContext";
import { chatContext } from "../contexts/useChatContext";
import {
  getEventHash,
  relayInit,
  getPublicKey,
  signEvent,
  validateEvent,
  verifySignature
} from "nostr-tools";
import Send from "../img/sendbutton.svg"

export const PostButton = ({message, receiverpubkey, resetMessage}) => {

    const { publish } = useNostr();
    const [encryptedMessage, setEncryptedMessage] = useState("");
    const { pubkey } = useContext(userContext);
    const { setCurrentUserPubkey } = useContext(chatContext);
    const encryptEvent = async () => {
        
    }

    const publishEvent = async () => {
        let enc = await window.nostr.nip04.encrypt(receiverpubkey, message);
        
        const event = {
          "content": enc,
          "kind": 4,
          "tags": [['p', receiverpubkey]],
          "created_at": dateToUnix(),
          "pubkey": pubkey,
        };
        
        console.log(event);
        event.id = getEventHash(event);
        const signedEvent = await window.nostr.signEvent(event);
        resetMessage('');
        setCurrentUserPubkey(receiverpubkey);
        return publish(signedEvent);
    };

    const sendMessage = async () => {
      if (message !== "") {
        publishEvent();
      }
        
    }

    return (
        <button className="sendButton" onClick={() => {sendMessage()}}><img src={Send}></img></button>
    )
}