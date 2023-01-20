import { createContext, useState, useEffect, useContext, useRef } from 'react';
import { uniqBy } from '../utils/util';
import { useProfile, dateToUnix, useNostrEvents, useNostr } from 'nostr-react';
import { userContext } from './useUserContext';
import User from '../img/user.png'
import { Message } from '../components/Message';
import { getLocalStorage, setLocalStorage } from '../utils/utils';
import {
  getEventHash,
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
    const connectedInRelays = useRef(0);
    const connectedOutRelays = useRef(0);
    const finishedInRelays = useRef(0);
    const finishedOutRelays = useRef(0);
    const [allReceived, setAllReceived] = useState(false);
    const latestSeen = useRef(1633426447);
    let inDone = useRef(false);
    let outDone = useRef(false);
    let [userNotifications, setUserNotifications] = useState({})
    const [cachedMessages, setCachedMessages] = useState([]);

    const { pubkey } = useContext(userContext);
    const { publish } = useNostr();

    const { onConnect: onInConnect, onDone : onInDone, events: incomingEvents, onEvent: onIncomingEvent } = useNostrEvents({
      filter: {
        kinds: [4],
        "#p": [pubkey],
        since: latestSeen.current
      },
    })

    const { onConnect: onOutConnect, onDone : onOutDone, events: outgoingEvents, onEvent: onOutgoingEvent } = useNostrEvents({
      filter: {
        kinds: [4],
        authors: [pubkey],
        since: latestSeen.current
      },
    })

    onInConnect(() => {
      connectedInRelays.current += 1;
    })


    onOutConnect(() => {
      connectedOutRelays.current += 1;
    })

    
    onOutDone(() => {
      finishedOutRelays.current += 1;
      if (finishedOutRelays.current >= connectedOutRelays.current ) {
        console.log('everything outgoing received');
        outDone.current = true;
      }
      
    })

    onInDone(() => {
      finishedInRelays.current += 1;
      if (finishedInRelays.current >= connectedInRelays.current ) {
        console.log('everything incoming received');
        inDone.current = true;
      }
    })


    onOutgoingEvent((event) => {
      if (outDone.current) {
        setSortedChatPartners(prev => uniqBy([{"pubkey": event.tags[0][1], "timestamp": event.created_at}, ...prev], "pubkey"));
        setMessageData(prev => uniqBy([event, ...prev], "id"));
        latestSeen.current = event.created_at;
      }
    })

    onIncomingEvent((event) => {
      if (inDone.current && pubkey !== event.pubkey) {
        if (event.created_at > dateToUnix(new Date()) - 6) {
          setUserNotifications(prev => ({...prev, [event.pubkey] : true}))
        }
        setSortedChatPartners(prev => uniqBy([{"pubkey": event.pubkey, "timestamp": event.created_at}, ...prev], "pubkey"));
        setMessageData(prev => uniqBy([event, ...prev], "id"));
        latestSeen.current = event.created_at;
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
        setUserNotifications(prev => ({...prev, [currentUserPubkey] : false}));
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

    const publishEvent = async (message, resetMessage = () => {}) => {
      let enc = await window.nostr.nip04.encrypt(currentUserPubkey, message);
      
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
      
      publish(signedEvent);
      resetMessage();
  };
   
    return (
        // this is the provider providing state
        <chatContext.Provider value={{currentUserPubkey, setCurrentUserPubkey, currentUserName, currentUserPicture, setCurrentUserPicture, setCurrentUserName, currentUserDecryptedChatData, sortedChatPartners, userNotifications, publishEvent}}>
            {props.children}
        </chatContext.Provider>
    );
};

export default ChatProvider;