import { createContext, useState, useEffect } from 'react';
import { getLocalStorage, setLocalStorage } from '../utils/utils'
import { useNostrEvents, useProfile } from 'nostr-react';
import User from '../img/user.png'

//create a context, with createContext api
export const userContext = createContext(null);

const UserProvider = (props) => {
    // this state will be shared with all components 
    const [pubkey, setPubkey] = useState(getLocalStorage("emon-pubkey", ""));
    const [username, setUsername] = useState(pubkey !== "" ? `E${pubkey.slice(0,5)}` : "");
    const [picture, setPicture] = useState(pubkey !== "" ? `https://api.dicebear.com/5.x/avataaars/png?seed=${pubkey.slice(0,5)}` : User)

    
    const { data: userData } = useProfile({
        pubkey: pubkey
    })

    useEffect(() => {
        if (userData) {
          setUsername(userData.name ? userData.name : `E${pubkey.slice(0,5)}`);
          try {
            setPicture(userData.picture ? encodeURI(`https://imgproxy-prod-emon-image-proxy-8tbihf.mo2.mogenius.io/imgproxy-og28dq/plain/${userData.picture}`) : `https://api.dicebear.com/5.x/avataaars/png?seed=${pubkey.slice(0,5)}`);
            
          } catch {
            console.log("malformed uri");
            setPicture(`https://api.dicebear.com/5.x/avataaars/png?seed=${pubkey.slice(0,5)}`);
          }
        }
      }, [userData])

    return (
        // this is the provider providing state
        <userContext.Provider value={{pubkey, setPubkey, username, picture}}>
            {props.children}
        </userContext.Provider>
    );
};

export default UserProvider;