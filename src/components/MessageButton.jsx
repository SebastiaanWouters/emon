import { useNostr, dateToUnix } from "nostr-react";

import {
  getEventHash,
  relayInit,
  getPublicKey,
  signEvent,
  validateEvent,
  verifySignature
} from "nostr-tools";


export const MessageButton = ({message, senderPubkey, receiverPubkey}) => {

    const { publish } = useNostr();


    const publishMessage = async (message, senderPubkey, receiverPubkey) => {
        const encryptedMessage = await window.nostr.nip04.encrypt(receiverPubkey, message);

        const event = {
            pubkey: senderPubkey,
            created_at: Math.floor(Date.now() / 1000),
            kind: 4,
            tags: [['p', receiverPubkey]],
            content: encryptedMessage
        }

        event.id = getEventHash(event);
        const signedEvent = await window.nostr.signEvent(event);
        return publish(signedEvent);
    };

    return (
        <button onClick={() => {publishMessage(message, senderPubkey, receiverPubkey)}}>Send</button>
    )
}