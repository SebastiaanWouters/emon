import { createContext, useState, useEffect, useContext, useRef } from 'react';
import { uniqBy } from '../utils/util';
import { useProfile, dateToUnix, useNostrEvents } from 'nostr-react';
import { userContext } from './useUserContext';
import User from '../img/user.png'
import { Message } from '../components/Message';
import { getLocalStorage, setLocalStorage } from '../utils/utils';
import {
  getEventHash,
  relayInit,
  getPublicKey,
  signEvent,
  validateEvent,
  verifySignature
} from "nostr-tools";

export const chatContext = createContext(null);

const ChatProvider = (props) => {
    // this state will be shared with all components 
    const [currentUserPubkey, setCurrentUserPubkey] = useState("");
    const [currentUserName, setCurrentUserName] = useState("");
    const [currentUserPicture, setCurrentUserPicture] = useState(User);
    const [currentUserDecryptedChatData, setCurrentUserDecryptedChatData] = useState("");
    const [sortedChatPartners, setSortedChatPartners] = useState([]);
    const [messageData, setMessageData] = useState([]);
    const latestSeen = useRef(1633426447);
    let inDone = useRef(false);
    let outDone = useRef(false);
    const [cachedMessages, setCachedMessages] = useState([]);

    const { pubkey } = useContext(userContext);
    const now = useRef(1568988346);
    

    const { onDone : onInDone, events: incomingEvents, onEvent: onOutgoingEvent } = useNostrEvents({
      filter: {
        kinds: [4],
        authors: [pubkey],
        since: latestSeen.current
      },
    })

    const { onDone : onOutDone, events: outgoingEvents, onEvent: onIncomingEvent } = useNostrEvents({
      filter: {
        kinds: [4],
        "#p": [pubkey],
        since: latestSeen.current
      },
    })

    
    onOutDone(() => {
      console.log('everything outgoing received');
      outDone.current = true;
    })

    onInDone(() => {
      console.log('everything incoming received');
      inDone.current = true;
    })

    onOutgoingEvent((event) => {
      if (outDone.current) {
        setSortedChatPartners(prev => uniqBy([{"pubkey": event.pubkey === pubkey ? event.tags[0][1] : event.pubkey, "timestamp": event.created_at}, ...prev], "pubkey"));
        setMessageData(prev => uniqBy([event, ...prev], "id"));
        latestSeen.current = event.created_at;
      }
    })

    onIncomingEvent((event) => {
      if (outDone.current && currentUserPubkey !== event.pubkey) {
        setSortedChatPartners(prev => uniqBy([{"pubkey": event.pubkey === pubkey ? event.tags[0][1] : event.pubkey, "timestamp": event.created_at}, ...prev], "pubkey"));
        setMessageData(prev => uniqBy([event, ...prev], "id"));
        latestSeen.current = evet.created_at;
      }
    })

    useEffect(() => {
      if (inDone.current && outDone.current) {
        console.log("everything is in!");
        const sortedEvents = incomingEvents.concat(outgoingEvents).map(event => ({...event, "sig":""})).sort((a, b) => (a.created_at > b.created_at) ? -1 : 1);
        setSortedChatPartners(uniqBy(sortedEvents.map((event) => ({"pubkey": event.pubkey === pubkey ? event.tags[0][1] : event.pubkey, "timestamp": event.created_at})), "pubkey"));
        setMessageData(uniqBy(sortedEvents, "id"));
        latestSeen.current = dateToUnix(new Date());
      }
      
    }, [inDone.current, outDone.current])

    useEffect(() => {
      async function decryptMessageData() {
        let decrypted = [];
        for (const event of messageData.filter(event => ((currentUserPubkey !== pubkey && (event.pubkey === currentUserPubkey || event.tags[0][1] === currentUserPubkey)) || (currentUserPubkey === pubkey && event.tags[0][1] === currentUserPubkey && event.pubkey === currentUserPubkey)))) {
          let decr = "";
          if (cachedMessages[event.id] || cachedMessages[event.id] === "") {
            decr = cachedMessages[event.id];
            console.log("cache hit")
          } else {
            try {
              decr = await window.nostr.nip04.decrypt(currentUserPubkey, event.content);
            } catch {
              decr = ""
            }
            setCachedMessages(prev => ({...prev, [event.id] : decr}));
          }
          
          decrypted.push({
            ...event,
            content: decr
          })
        }
        setCurrentUserDecryptedChatData(decrypted)
      }
      
      if (inDone.current && outDone.current && currentUserPubkey != "") {
          decryptMessageData();
          
      }
      
    }, [messageData, currentUserPubkey])
   
    return (
        // this is the provider providing state
        <chatContext.Provider value={{currentUserPubkey, setCurrentUserPubkey, currentUserName, currentUserPicture, setCurrentUserPicture, setCurrentUserName, currentUserDecryptedChatData, sortedChatPartners}}>
            {props.children}
        </chatContext.Provider>
    );
};

export default ChatProvider;