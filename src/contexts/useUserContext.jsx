import { createContext, useState, useEffect } from 'react';
import { getLocalStorage, setLocalStorage } from '../utils/utils'
import { useNostrEvents, useProfile } from 'nostr-react';
import User from '../img/user.png'

//create a context, with createContext api
export const userContext = createContext(null);

const UserProvider = (props) => {
    // this state will be shared with all components 
    const [pubkey, setPubkey] = useState(getLocalStorage("emon-pubkey", ""));
    const [username, setUsername] = useState("");
    const [picture, setPicture] = useState(User)

    const { onEvent: onNewUser } = useNostrEvents({
    filter: {
        kinds: [0],
        authors: [pubkey],
    },
    })

    onNewUser((metaData) => {
        const user = JSON.parse(metaData.content);
        setUsername(user.name ? user.name : `E${pubkey.slice(0,5)}`);
        try {
            setPicture(user.picture ? encodeURI(user.picture) : `https://avatars.dicebear.com/v2/avataaars/${pubkey.slice(0,5)}.svg`);
        } catch {
            setPicture(`https://avatars.dicebear.com/v2/avataaars/${pubkey.slice(0,5)}.svg`);
        }
        
    })

    return (
        // this is the provider providing state
        <userContext.Provider value={{pubkey, setPubkey, username, picture}}>
            {props.children}
        </userContext.Provider>
    );
};

export default UserProvider;